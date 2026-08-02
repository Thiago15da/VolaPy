import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, MapPin, X, Info } from 'lucide-react';
import { BASES, FLEET_STATUS_STYLES, fleetAtBase, findAirport } from '../data';
import { PARAGUAY_OUTLINE, PARAGUAY_RIVER, VIEWBOX, project, toPath, toPoints } from '../geo';
import { useT } from '../LanguageContext';
import { Reveal } from '../motion';

const OUTLINE = toPoints(PARAGUAY_OUTLINE);
const RIVER = toPath(PARAGUAY_RIVER);

/**
 * Mapa estático de bases operativas.
 *
 * Deliberadamente sin animación: nada de aeronaves recorriendo trayectorias
 * en bucle. Un mapa quieto se lee como un dato operativo; uno animado, como
 * un adorno — y además insinuaría un seguimiento en vivo que no existe.
 */
export default function FleetRadar() {
  const t = useT();
  const [selected, setSelected] = useState(BASES[0].code);

  const base = findAirport(selected);
  const aircraft = fleetAtBase(selected);

  return (
    <section id="radar" className="section bg-ink-950">
      <div className="shell">
        <Reveal className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow mb-4 flex items-center gap-2 !text-white/40">
              <MapPin size={14} />
              {t('radar.eyebrow')}
            </p>
            <h2 className="h-section font-display font-bold text-white">{t('radar.title')}</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/50">{t('radar.lead')}</p>
        </Reveal>

        <Reveal className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Mapa */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-4 sm:p-8">
            <svg
              viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
              className="h-auto w-full"
              role="img"
              aria-label={t('radar.title')}
            >
              {/* País: contorno fino, sin grilla ni resplandor */}
              <polygon
                points={OUTLINE}
                fill="rgba(255,255,255,0.035)"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1.75"
                strokeLinejoin="round"
              />
              <path
                d={RIVER}
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1.75"
                strokeLinecap="round"
              />

              {/* Bases */}
              {BASES.map((b) => {
                const { x, y } = project(b.lng, b.lat);
                const active = selected === b.code;
                const count = fleetAtBase(b.code).length;
                // Cerca del borde derecho la etiqueta se saldría del lienzo:
                // ahí se ancla al otro lado del marcador.
                const flip = x > VIEWBOX.width * 0.72;
                const labelX = flip ? -26 : 26;
                const anchor = flip ? 'end' : 'start';
                return (
                  <g
                    key={b.code}
                    transform={`translate(${x}, ${y})`}
                    onClick={() => setSelected(b.code)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelected(b.code)}
                    role="button"
                    tabIndex={0}
                    aria-pressed={active}
                    aria-label={`${b.city} (${b.code}) — ${count}`}
                    className="cursor-pointer"
                  >
                    {active && <circle r="26" fill="rgba(201,169,97,0.14)" />}
                    <circle
                      r={active ? 11 : 8}
                      fill={active ? '#C9A961' : 'rgba(255,255,255,0.85)'}
                      className="transition-all duration-300"
                    />
                    <circle
                      r={active ? 19 : 15}
                      fill="none"
                      stroke={active ? 'rgba(201,169,97,0.5)' : 'rgba(255,255,255,0.2)'}
                      strokeWidth="1.5"
                    />
                    <text
                      x={labelX}
                      y="-2"
                      textAnchor={anchor}
                      fill={active ? '#ffffff' : 'rgba(255,255,255,0.65)'}
                      fontSize="21"
                      fontWeight="700"
                      className="select-none"
                    >
                      {b.code}
                    </text>
                    <text
                      x={labelX}
                      y="20"
                      textAnchor={anchor}
                      fill="rgba(255,255,255,0.4)"
                      fontSize="17"
                      className="select-none"
                    >
                      {b.city}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Panel de la base seleccionada */}
          <div className="flex flex-col gap-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-xl font-bold text-white">{base.city}</p>
                    <p className="mt-0.5 text-sm text-white/50">
                      {base.name} · {base.code}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-lg bg-white/10 px-2.5 py-1 text-sm font-semibold text-white">
                    {aircraft.length}
                  </span>
                </div>

                <p className="mt-6 text-[0.625rem] uppercase tracking-[0.12em] text-white/35">
                  {t('radar.aircraft')}
                </p>

                <ul className="mt-3 space-y-2">
                  {aircraft.map((c) => {
                    const style = FLEET_STATUS_STYLES[c.status];
                    return (
                      <li
                        key={c.id}
                        className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3.5 py-3"
                      >
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{ backgroundColor: style.dot }}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-white/90">
                            {c.id}
                          </span>
                          <span className="block truncate text-xs text-white/40">{c.model}</span>
                        </span>
                        <span
                          className="shrink-0 rounded-full px-2.5 py-1 text-[0.625rem] font-semibold"
                          style={{ backgroundColor: style.ring, color: style.dot }}
                        >
                          {c.status}
                        </span>
                      </li>
                    );
                  })}
                  {aircraft.length === 0 && (
                    <li className="rounded-xl border border-dashed border-white/12 px-3.5 py-6 text-center text-sm text-white/40">
                      <Plane size={18} className="mx-auto mb-2 text-white/25" />
                      {t('radar.selectBase')}
                    </li>
                  )}
                </ul>
              </motion.div>
            </AnimatePresence>

            {/* Leyenda de estados */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl border border-white/10 px-5 py-4">
              {Object.entries(FLEET_STATUS_STYLES).map(([status, style]) => (
                <span key={status} className="flex items-center gap-2 text-xs text-white/55">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: style.dot }} />
                  {status}
                </span>
              ))}
            </div>

            <p className="flex items-start gap-2 px-1 text-xs leading-relaxed text-white/30">
              <Info size={13} className="mt-0.5 shrink-0" />
              {t('radar.disclaimer')}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
