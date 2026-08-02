import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, CloudRain, Navigation, Eye, Thermometer, Gauge, CloudSun } from 'lucide-react';
import { WEATHER_CATEGORIES, getWeather } from '../data';
import { Reveal, stagger, fadeUp } from '../motion';

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

export default function AviationWeather({ compact = false }) {
  const stations = useMemo(() => getWeather(), []);
  const [open, setOpen] = useState(null);

  return (
    <section id="clima" className={compact ? '' : 'section bg-cloud-100'}>
      <div className="shell">
        {!compact && (
          <Reveal className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow mb-4 flex items-center gap-2">
                <CloudSun size={14} />
                Clima aeronáutico
              </p>
              <h2 className="h-section font-display font-bold text-ink-900">
                Condiciones en los aeropuertos del país
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-gray-500">
              Lectura simplificada de METAR y TAF para planificación de vuelo.
              Tocá una estación para ver el reporte completo.
            </p>
          </Reveal>
        )}

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -40px 0px' }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
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
                      <p className="truncate text-xs text-gray-400">
                        {s.airport.city} · {s.airport.name}
                      </p>
                    </div>
                    <CategoryChip category={s.category} />
                  </div>

                  <div className="mt-5 flex items-center gap-4">
                    <WindDial deg={s.windDeg} kt={s.windKt} />
                    <dl className="min-w-0 flex-1 space-y-1.5 text-sm">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Navigation size={13} className="shrink-0 text-gray-400" />
                        <dt className="sr-only">Viento</dt>
                        <dd className="truncate">
                          Viento {cardinal(s.windDeg)} ({s.windDeg}°)
                        </dd>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Cloud size={13} className="shrink-0 text-gray-400" />
                        <dt className="sr-only">Nubosidad</dt>
                        <dd className="truncate">{s.clouds}</dd>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <CloudRain size={13} className="shrink-0 text-gray-400" />
                        <dt className="sr-only">Precipitación</dt>
                        <dd className="truncate">{s.precip}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-3 border-t border-gray-200/70 pt-4">
                    <div className="flex items-center gap-1.5">
                      <Thermometer size={13} className="text-gray-400" />
                      <span className="text-sm font-semibold text-ink-900">{s.tempC}°</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye size={13} className="text-gray-400" />
                      <span className="text-sm font-semibold text-ink-900">{s.visibilityKm} km</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Gauge size={13} className="text-gray-400" />
                      <span className="text-sm font-semibold text-ink-900">{s.qnh}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : s.code)}
                    aria-expanded={isOpen}
                    className="mt-4 text-xs font-semibold text-gray-400 transition-colors hover:text-ink-900"
                  >
                    {isOpen ? 'Ocultar reporte' : 'Ver METAR / TAF'}
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

        <p className="mt-6 text-xs leading-relaxed text-gray-400">
          Datos de referencia con formato METAR/TAF real, provistos como demostración.
          No usar para planificación operativa: consultá siempre la fuente oficial de
          la DINAC antes de volar.
        </p>
      </div>
    </section>
  );
}
