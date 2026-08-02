import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Radar, X, Gauge } from 'lucide-react';
import { AIRPORTS, FLEET_STATUS, FLEET_STATUS_STYLES, findAirport } from '../data';
import {
  PARAGUAY_OUTLINE,
  PARAGUAY_RIVER,
  VIEWBOX,
  bearing,
  interpolate,
  project,
  toPath,
  toPoints,
} from '../geo';
import { Reveal } from '../motion';

const TICK_MS = 2000;
const OUTLINE = toPoints(PARAGUAY_OUTLINE);
const RIVER = toPath(PARAGUAY_RIVER);

/** Posición y rumbo de una aeronave según su estado. */
function locate(craft, progress) {
  if (craft.status !== 'En vuelo') {
    const at = findAirport(craft.at);
    return { ...project(at.lng, at.lat), rotation: 0, airport: at };
  }
  const from = findAirport(craft.from);
  const to = findAirport(craft.to);
  const pos = interpolate(from, to, progress);
  return {
    ...project(pos.lng, pos.lat),
    rotation: bearing(from, to),
    from,
    to,
  };
}

export default function FleetRadar() {
  const [tick, setTick] = useState(0);
  const [selected, setSelected] = useState(null);
  const [since, setSince] = useState(0);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    if (reduceMotion.current) return;
    const id = setInterval(() => {
      setTick((t) => t + 1);
      setSince(0);
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setSince((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // Las aeronaves en vuelo avanzan y rebotan entre origen y destino.
  const fleet = useMemo(
    () =>
      FLEET_STATUS.map((craft) => {
        if (craft.status !== 'En vuelo') return { ...craft, pos: locate(craft) };
        const raw = (craft.progress + tick * 0.012) % 2;
        const progress = raw > 1 ? 2 - raw : raw;
        return { ...craft, progress, pos: locate(craft, progress) };
      }),
    [tick]
  );

  const counts = useMemo(
    () =>
      Object.keys(FLEET_STATUS_STYLES).map((status) => ({
        status,
        n: FLEET_STATUS.filter((c) => c.status === status).length,
      })),
    []
  );

  return (
    <section id="radar" className="section bg-ink-950">
      <div className="shell">
        <Reveal className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow mb-4 flex items-center gap-2 !text-white/40">
              <Radar size={14} />
              Radar de flota
            </p>
            <h2 className="h-section font-display font-bold text-white">
              Nuestra flota, en tiempo real
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/50">
            Seguimiento de las aeronaves de VOLA sobre los aeropuertos del país.
            Tocá cualquier marcador para ver el detalle de la unidad.
          </p>
        </Reveal>

        <Reveal className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
          {/* Mapa */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-6">
            <svg
              viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
              className="h-auto w-full"
              role="img"
              aria-label="Mapa de Paraguay con la ubicación de la flota de VOLA"
            >
              <defs>
                <radialGradient id="radar-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#C9A961" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#C9A961" stopOpacity="0" />
                </radialGradient>
                <pattern id="radar-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M50 0H0V50" fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="1" />
                </pattern>
              </defs>

              <rect width={VIEWBOX.width} height={VIEWBOX.height} fill="url(#radar-grid)" />
              <circle cx={VIEWBOX.width / 2} cy={VIEWBOX.height / 2} r="420" fill="url(#radar-glow)" />

              {/* País */}
              <polygon
                points={OUTLINE}
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.28)"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path d={RIVER} fill="none" stroke="rgba(120,180,255,0.28)" strokeWidth="2.5" strokeLinecap="round" />

              {/* Rutas activas */}
              {fleet
                .filter((c) => c.status === 'En vuelo')
                .map((c) => {
                  const a = project(findAirport(c.from).lng, findAirport(c.from).lat);
                  const b = project(findAirport(c.to).lng, findAirport(c.to).lat);
                  return (
                    <line
                      key={`route-${c.id}`}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke="rgba(22,163,74,0.35)"
                      strokeWidth="1.5"
                      strokeDasharray="6 7"
                    />
                  );
                })}

              {/* Aeropuertos */}
              {AIRPORTS.map((a) => {
                const { x, y } = project(a.lng, a.lat);
                return (
                  <g key={a.code}>
                    <circle cx={x} cy={y} r={a.hub ? 7 : 5} fill="rgba(255,255,255,0.9)" />
                    <circle cx={x} cy={y} r={a.hub ? 14 : 11} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
                    <text
                      x={x + 18}
                      y={y + 4}
                      fill="rgba(255,255,255,0.6)"
                      fontSize="20"
                      fontWeight="600"
                      className="select-none"
                    >
                      {a.code}
                    </text>
                  </g>
                );
              })}

              {/* Aeronaves */}
              {fleet.map((c) => {
                const style = FLEET_STATUS_STYLES[c.status];
                const active = selected?.id === c.id;
                return (
                  <g
                    key={c.id}
                    transform={`translate(${c.pos.x}, ${c.pos.y})`}
                    onClick={() => setSelected(c)}
                    className="cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label={`${c.id}, ${c.model}, ${c.status}`}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelected(c)}
                  >
                    <circle r={active ? 30 : 22} fill={style.ring} />
                    <g transform={`rotate(${c.pos.rotation})`}>
                      <path
                        d="M0,-13 L4,-2 L13,4 L13,7 L3,4.5 L2,11 L6,14 L6,16 L0,14.5 L-6,16 L-6,14 L-2,11 L-3,4.5 L-13,7 L-13,4 L-4,-2 Z"
                        fill={style.dot}
                        stroke="rgba(0,0,0,0.25)"
                        strokeWidth="0.5"
                      />
                    </g>
                  </g>
                );
              })}
            </svg>

            {/* Leyenda */}
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-4">
              {counts.map(({ status, n }) => (
                <span key={status} className="flex items-center gap-2 text-xs text-white/55">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: FLEET_STATUS_STYLES[status].dot }}
                  />
                  {status} · {n}
                </span>
              ))}
              <span className="ml-auto text-xs text-white/30">
                Actualizado hace {since}s
              </span>
            </div>
          </div>

          {/* Panel lateral */}
          <div className="flex flex-col gap-3">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-xl font-bold text-white">{selected.id}</p>
                      <p className="mt-0.5 text-sm text-white/50">{selected.model}</p>
                    </div>
                    <button
                      onClick={() => setSelected(null)}
                      aria-label="Cerrar detalle"
                      className="rounded-lg p-1 text-white/40 transition-colors hover:text-white"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <span
                    className="mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: FLEET_STATUS_STYLES[selected.status].ring,
                      color: FLEET_STATUS_STYLES[selected.status].dot,
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: FLEET_STATUS_STYLES[selected.status].dot }}
                    />
                    {selected.status}
                  </span>

                  <dl className="mt-5 space-y-3 border-t border-white/10 pt-5">
                    <div className="flex items-center justify-between text-sm">
                      <dt className="text-white/40">Tipo</dt>
                      <dd className="text-white/85">{selected.type}</dd>
                    </div>
                    {selected.status === 'En vuelo' ? (
                      <>
                        <div className="flex items-center justify-between text-sm">
                          <dt className="text-white/40">Ruta</dt>
                          <dd className="text-white/85">
                            {selected.from} → {selected.to}
                          </dd>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <dt className="text-white/40">Progreso</dt>
                          <dd className="text-white/85">{Math.round(selected.progress * 100)}%</dd>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-between text-sm">
                        <dt className="text-white/40">Ubicación</dt>
                        <dd className="text-white/85">
                          {findAirport(selected.at).city} ({selected.at})
                        </dd>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <dt className="text-white/40">Altitud</dt>
                      <dd className="text-white/85">{selected.altitude}</dd>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <dt className="text-white/40">Velocidad</dt>
                      <dd className="text-white/85">{selected.speed}</dd>
                    </div>
                  </dl>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-dashed border-white/12 p-6 text-center"
                >
                  <Plane size={22} className="mx-auto mb-3 text-white/25" />
                  <p className="text-sm text-white/45">
                    Seleccioná una aeronave en el mapa para ver su estado.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Lista de flota */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-2">
              {fleet.map((c) => {
                const style = FLEET_STATUS_STYLES[c.status];
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelected(c)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-300 ${
                      selected?.id === c.id ? 'bg-white/8' : 'hover:bg-white/5'
                    }`}
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: style.dot }} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-white/90">{c.id}</span>
                      <span className="block truncate text-xs text-white/40">{c.model}</span>
                    </span>
                    <span className="shrink-0 text-xs text-white/40">
                      {c.status === 'En vuelo' ? `${c.from}→${c.to}` : c.at}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="flex items-start gap-2 px-1 text-xs leading-relaxed text-white/30">
              <Gauge size={13} className="mt-0.5 shrink-0" />
              Visualización de demostración con datos operativos simulados. No es un sistema
              de seguimiento ADS-B en vivo.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
