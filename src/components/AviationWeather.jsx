import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Cloud,
  CloudOff,
  CloudRain,
  CloudSun,
  ExternalLink,
  Eye,
  Gauge,
  Navigation,
  Thermometer,
} from 'lucide-react';
import {
  WEATHER_CATEGORIES,
  WEATHER_LAYERS,
  WINDY_FULL_URL,
  buildWindyUrl,
  getWeather,
} from '../data';
import { useT } from '../LanguageContext';
import { Reveal, stagger, fadeUp } from '../motion';

/** Margen para decidir si el servicio externo responde antes de montar el iframe. */
const PROBE_TIMEOUT_MS = 6000;

/** Convierte grados a punto cardinal, como se lee en un briefing. */
function cardinal(deg) {
  const points = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'];
  return points[Math.round(deg / 22.5) % 16];
}

function CategoryChip({ category }) {
  const c = WEATHER_CATEGORIES[category];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6875rem] font-bold tracking-wide"
      style={{ backgroundColor: `${c.color}18`, color: c.color }}
      title={c.desc}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.color }} />
      {c.label}
    </span>
  );
}

/** Rosa de viento: la flecha apunta hacia donde sopla el viento. */
function WindDial({ deg, kt }) {
  return (
    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-cloud-100">
      <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full text-gray-300">
        {[0, 90, 180, 270].map((a) => (
          <line
            key={a}
            x1="32"
            y1="6"
            x2="32"
            y2="11"
            stroke="currentColor"
            strokeWidth="1.5"
            transform={`rotate(${a} 32 32)`}
          />
        ))}
      </svg>
      <Navigation
        size={20}
        className="text-ink-900 transition-transform duration-500"
        style={{ transform: `rotate(${deg + 180}deg)` }}
        fill="currentColor"
      />
      <span className="absolute -bottom-1 rounded-full bg-white px-1.5 text-[0.625rem] font-semibold text-gray-500 shadow-soft">
        {kt} kt
      </span>
    </div>
  );
}

/**
 * Mapa meteorológico en vivo, con respaldo si el embed externo no carga.
 *
 * No sirve escuchar `onError` del iframe: cuando la carga falla el navegador
 * dispara igualmente `load` sobre la página de error, y al ser otro origen no
 * podemos inspeccionar su contenido. Por eso sondeamos la red antes de montar
 * el iframe y sólo lo insertamos si el servicio responde.
 */
function LiveWeatherMap() {
  const t = useT();
  const [layer, setLayer] = useState('wind');
  const [status, setStatus] = useState('checking'); // checking | ok | failed
  const timer = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    timer.current = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS);

    // `no-cors` devuelve una respuesta opaca: no podemos leerla, pero sí
    // distinguir "el host respondió" de "la petición falló".
    fetch(buildWindyUrl(), { mode: 'no-cors', signal: controller.signal })
      .then(() => setStatus('ok'))
      .catch(() => setStatus('failed'))
      .finally(() => clearTimeout(timer.current));

    return () => {
      clearTimeout(timer.current);
      controller.abort();
    };
  }, []);

  const failed = status === 'failed';

  return (
    <div className="mb-10 overflow-hidden rounded-3xl border border-gray-200/80 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-3">
        <div className="flex gap-1" role="group" aria-label={t('weather.mapTitle')}>
          {WEATHER_LAYERS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setLayer(l.id)}
              aria-pressed={layer === l.id}
              className={`rounded-xl px-3.5 py-2 text-sm font-medium transition-colors duration-300 ${
                layer === l.id
                  ? 'bg-ink-900 text-white'
                  : 'text-gray-500 hover:bg-cloud-100 hover:text-ink-900'
              }`}
            >
              {t(l.key)}
            </button>
          ))}
        </div>
        <a
          href={WINDY_FULL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2 text-xs text-gray-400 transition-colors hover:text-ink-900"
        >
          {t('weather.openWindy')}
          <ExternalLink size={12} />
        </a>
      </div>

      <div className="relative aspect-[16/10] w-full bg-cloud-100 sm:aspect-[16/9]">
        {failed ? (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <CloudOff size={26} className="mb-3 text-gray-300" />
            <p className="font-display text-base font-bold text-ink-900">
              {t('weather.mapUnavailable')}
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-gray-500">
              {t('weather.mapUnavailableDesc')}
            </p>
            <a
              href={WINDY_FULL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline mt-5 !py-2.5 !text-xs"
            >
              {t('weather.openWindy')}
              <ExternalLink size={13} />
            </a>
          </div>
        ) : status === 'checking' ? (
          <div className="flex h-full items-center justify-center">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-ink-900" />
          </div>
        ) : (
          <iframe
            // La clave fuerza el remontaje al cambiar de capa: el embed de
            // Windy no reacciona a un cambio de src en caliente.
            key={layer}
            src={buildWindyUrl(layer)}
            title={t('weather.mapTitle')}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full border-0"
          />
        )}
      </div>
    </div>
  );
}

export default function AviationWeather({ compact = false, showMap = true }) {
  const t = useT();
  const stations = useMemo(() => getWeather(), []);
  const [open, setOpen] = useState(null);

  return (
    <section id="clima" className={compact ? '' : 'section bg-cloud-100'}>
      <div className="shell">
        {!compact && (
          <Reveal className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow mb-4 flex items-center gap-2">
                <CloudSun size={14} />
                {t('weather.eyebrow')}
              </p>
              <h2 className="h-section font-display font-bold text-ink-900">
                {t('weather.title')}
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-gray-500">{t('weather.lead')}</p>
          </Reveal>
        )}

        {showMap && <LiveWeatherMap />}

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -40px 0px' }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {stations.map((s) => {
            const isOpen = open === s.code;
            return (
              <motion.article
                key={s.code}
                variants={fadeUp}
                className="card-clean overflow-hidden bg-white"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-display text-lg font-bold text-ink-900">{s.code}</p>
                      <p className="truncate text-xs text-gray-400">{s.airport.city}</p>
                    </div>
                    <CategoryChip category={s.category} />
                  </div>

                  <div className="mt-5 flex items-center gap-4">
                    <WindDial deg={s.windDeg} kt={s.windKt} />
                    <dl className="min-w-0 flex-1 space-y-1.5 text-sm">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Navigation size={13} className="shrink-0 text-gray-400" />
                        <dt className="sr-only">{t('weather.wind')}</dt>
                        <dd className="truncate">
                          {cardinal(s.windDeg)} · {s.windDeg}°
                        </dd>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Cloud size={13} className="shrink-0 text-gray-400" />
                        <dt className="sr-only">{t('weather.clouds')}</dt>
                        <dd className="truncate">{s.clouds}</dd>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <CloudRain size={13} className="shrink-0 text-gray-400" />
                        <dt className="sr-only">{t('weather.precip')}</dt>
                        <dd className="truncate">{s.precip}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2 border-t border-gray-200/70 pt-4">
                    <div className="flex items-center gap-1.5">
                      <Thermometer size={13} className="shrink-0 text-gray-400" />
                      <span className="text-sm font-semibold text-ink-900">{s.tempC}°</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye size={13} className="shrink-0 text-gray-400" />
                      <span className="text-sm font-semibold text-ink-900">{s.visibilityKm}km</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Gauge size={13} className="shrink-0 text-gray-400" />
                      <span className="text-sm font-semibold text-ink-900">{s.qnh}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : s.code)}
                    aria-expanded={isOpen}
                    className="mt-4 text-xs font-semibold text-gray-400 transition-colors hover:text-ink-900"
                  >
                    {isOpen ? t('weather.hideRaw') : t('weather.showRaw')}
                  </button>
                </div>

                {isOpen && (
                  <div className="space-y-2 border-t border-gray-200/70 bg-cloud-100 p-5">
                    <div>
                      <p className="field-label !mb-1">METAR</p>
                      <code className="block break-words font-mono text-xs leading-relaxed text-ink-900">
                        {s.metar}
                      </code>
                    </div>
                    <div>
                      <p className="field-label !mb-1 pt-2">TAF</p>
                      <code className="block break-words font-mono text-xs leading-relaxed text-ink-900">
                        {s.taf}
                      </code>
                    </div>
                  </div>
                )}
              </motion.article>
            );
          })}
        </motion.div>

        <p className="mt-6 text-xs leading-relaxed text-gray-400">{t('weather.disclaimer')}</p>
      </div>
    </section>
  );
}
