import { Check } from 'lucide-react';
import ComingSoon from '../components/ComingSoon';
import { Reveal } from '../motion';

const TIERS = [
  {
    name: 'Signature',
    desc: 'Para quien vuela algunas veces al año y quiere prioridad sin compromiso anual.',
    perks: ['Tarifas preferenciales', 'Prioridad de reserva', 'Concierge dedicado'],
  },
  {
    name: 'Private',
    desc: 'Horas de vuelo prepagas con tarifa fija garantizada durante todo el período.',
    perks: ['Banco de horas', 'Tarifa fija garantizada', 'Cancelación flexible', 'Upgrade sujeto a disponibilidad'],
    featured: true,
  },
  {
    name: 'Executive',
    desc: 'Para empresas con vuelos recurrentes y varios pasajeros autorizados.',
    perks: ['Múltiples pasajeros autorizados', 'Facturación corporativa', 'Reportes de uso', 'Aeronave garantizada'],
  },
];

export default function Membresia() {
  return (
    <ComingSoon
      product="Membresía VOLA"
      title="Volá siempre bajo las mismas condiciones"
      description="Un programa de membresía con tarifas fijas, prioridad de reserva y horas prepagas. Estamos definiendo los niveles con nuestros primeros socios."
      bullets={[
        'Tarifa fija garantizada por hora de vuelo.',
        'Prioridad de reserva incluso en fechas pico.',
        'Concierge asignado que ya conoce tus preferencias.',
        'Beneficios extendidos a pasajeros autorizados de tu empresa.',
      ]}
    >
      <div className="shell mt-20">
        <Reveal className="mb-10 max-w-xl">
          <p className="eyebrow mb-4">Niveles previstos</p>
          <h2 className="h-section font-display font-bold text-ink-900">
            Tres formas de volar con VOLA
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-500">
            Estructura preliminar, en definición junto a los socios fundadores. Las
            condiciones finales pueden cambiar antes del lanzamiento.
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.07}>
              <div
                className={`flex h-full flex-col rounded-2xl border p-7 transition-all duration-300 ${
                  tier.featured
                    ? 'border-ink-900 bg-ink-950 text-white'
                    : 'border-gray-200/80 bg-white'
                }`}
              >
                <p
                  className={`font-display text-xl font-bold ${
                    tier.featured ? 'text-white' : 'text-ink-900'
                  }`}
                >
                  {tier.name}
                </p>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    tier.featured ? 'text-white/60' : 'text-gray-500'
                  }`}
                >
                  {tier.desc}
                </p>
                <ul
                  className={`mt-6 space-y-3 border-t pt-5 ${
                    tier.featured ? 'border-white/10' : 'border-gray-200/70'
                  }`}
                >
                  {tier.perks.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <Check
                        size={15}
                        className={`mt-0.5 shrink-0 ${
                          tier.featured ? 'text-signal-amber' : 'text-signal-green'
                        }`}
                      />
                      <span
                        className={`text-sm ${tier.featured ? 'text-white/80' : 'text-gray-600'}`}
                      >
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </ComingSoon>
  );
}
