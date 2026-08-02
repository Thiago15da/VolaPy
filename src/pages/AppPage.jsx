import { Plane, Bell, CreditCard, MapPin } from 'lucide-react';
import ComingSoon from '../components/ComingSoon';
import { Reveal } from '../motion';

const SCREENS = [
  {
    icon: Plane,
    title: 'Cotizá y reservá',
    lines: ['Asunción → Ciudad del Este', '2 pasajeros · 14 Ago', '$1.450 USD'],
  },
  {
    icon: Bell,
    title: 'Seguimiento del vuelo',
    lines: ['ZP-VLA · En vuelo', 'Llegada estimada 15:40', 'Tripulación confirmada'],
  },
  {
    icon: CreditCard,
    title: 'Pagos y facturación',
    lines: ['Factura electrónica', 'Historial de vuelos', 'Banco de horas'],
  },
];

/** Mockup de teléfono, dibujado en CSS: sin imágenes ni dependencias. */
function PhoneMock({ screen, delay }) {
  const Icon = screen.icon;
  return (
    <Reveal delay={delay} className="mx-auto w-full max-w-[15rem]">
      <div className="rounded-[2.25rem] border-[6px] border-ink-950 bg-ink-950 p-1 shadow-lift">
        <div className="relative overflow-hidden rounded-[1.8rem] bg-white">
          {/* Notch */}
          <div className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-ink-950" />

          <div className="px-4 pb-6 pt-9">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-display text-sm font-extrabold tracking-[0.06em] text-ink-900">
                VOLA
              </span>
              <MapPin size={13} className="text-gray-300" />
            </div>

            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-ink-900 text-white">
              <Icon size={16} strokeWidth={1.5} />
            </div>

            <p className="mb-3 font-display text-sm font-bold text-ink-900">{screen.title}</p>

            <div className="space-y-2">
              {screen.lines.map((l, i) => (
                <div
                  key={l}
                  className={`rounded-lg px-3 py-2 text-[0.6875rem] ${
                    i === 0 ? 'bg-cloud-100 font-semibold text-ink-900' : 'bg-cloud-100/60 text-gray-500'
                  }`}
                >
                  {l}
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-lg bg-ink-900 py-2 text-center text-[0.6875rem] font-semibold text-white">
              Continuar
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-gray-400">{screen.title}</p>
    </Reveal>
  );
}

export default function AppPage() {
  return (
    <ComingSoon
      product="App VOLA"
      title="Toda la operación, en tu bolsillo"
      description="Cotizá, reservá y seguí tus vuelos desde iOS y Android. En desarrollo; la lista de espera accede primero a la beta."
      bullets={[
        'Cotización instantánea con las mismas tarifas que la web.',
        'Seguimiento del vuelo y estado de la tripulación en vivo.',
        'Historial, facturación electrónica y banco de horas.',
        'Notificaciones de empty legs que coincidan con tus rutas.',
      ]}
    >
      <div className="shell mt-20">
        <Reveal className="mb-12 max-w-xl">
          <p className="eyebrow mb-4">Vista previa</p>
          <h2 className="h-section font-display font-bold text-ink-900">Así se va a ver</h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-500">
            Pantallas conceptuales de la aplicación en desarrollo. El diseño final puede variar.
          </p>
        </Reveal>

        <div className="grid gap-10 sm:grid-cols-3">
          {SCREENS.map((s, i) => (
            <PhoneMock key={s.title} screen={s} delay={i * 0.09} />
          ))}
        </div>
      </div>
    </ComingSoon>
  );
}
