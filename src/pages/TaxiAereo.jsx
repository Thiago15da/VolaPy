import { Plane, Clock, MapPin, ShieldCheck } from 'lucide-react';
import { AIRPORTS, HERO_IMAGE } from '../data';
import PageHeader from '../components/PageHeader';
import FlightQuoter from '../components/FlightQuoter';
import Fleet from '../components/Fleet';
import AviationWeather from '../components/AviationWeather';
import { Reveal } from '../motion';
import usePageMeta from '../usePageMeta';

const BENEFITS = [
  { icon: Clock, title: 'Salidas en el día', desc: 'Coordinamos despegues con pocas horas de aviso según disponibilidad de aeronave y tripulación.' },
  { icon: MapPin, title: 'Cobertura nacional', desc: 'Operamos los ocho aeropuertos principales del país, incluyendo pistas del Chaco.' },
  { icon: ShieldCheck, title: 'Operadores certificados', desc: 'Trabajamos exclusivamente con operadores habilitados y tripulaciones con licencia vigente.' },
];

export default function TaxiAereo() {
  usePageMeta(
    'Taxi Aéreo',
    'Vuelos charter domésticos en jet, turbohélice y helicóptero por todo Paraguay. Cotizá tu ruta al instante.'
  );

  return (
    <>
      <PageHeader
        eyebrow="Taxi aéreo"
        title="Volá a cualquier punto del país, en tu horario"
        description="Charter doméstico bajo demanda entre los principales aeropuertos de Paraguay. Sin escalas, sin filas y sin ajustar tu agenda a la de nadie."
        image={HERO_IMAGE}
      />

      <section className="section">
        <div className="shell">
          <Reveal className="mx-auto max-w-4xl">
            <FlightQuoter />
          </Reveal>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <Reveal key={b.title} delay={i * 0.07} className="card-clean card-clean-hover p-7">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-ink-900 text-white">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-3 font-display text-lg font-bold text-ink-900">{b.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{b.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Red de aeropuertos */}
      <section className="section bg-cloud-100">
        <div className="shell">
          <Reveal className="mb-10 max-w-xl">
            <p className="eyebrow mb-4">Red</p>
            <h2 className="h-section font-display font-bold text-ink-900">
              Aeropuertos que operamos
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {AIRPORTS.map((a, i) => (
              <Reveal key={a.code} delay={i * 0.04} className="card-clean p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-display font-bold text-ink-900">{a.city}</p>
                    <p className="truncate text-xs text-gray-400">{a.name}</p>
                  </div>
                  <span className="shrink-0 rounded-md bg-cloud-200 px-1.5 py-0.5 text-[0.625rem] font-semibold tracking-wide text-gray-500">
                    {a.code}
                  </span>
                </div>
                {a.hub && (
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-signal-green">
                    <Plane size={11} />
                    Base principal
                  </span>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Fleet heading="Elegí la aeronave para tu ruta" />
      <AviationWeather />
    </>
  );
}
