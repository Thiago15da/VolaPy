import { Target, Eye, Globe2 } from 'lucide-react';
import { HERO_IMAGE } from '../data';
import PageHeader from '../components/PageHeader';
import { Reveal } from '../motion';
import usePageMeta from '../usePageMeta';

const PILLARS = [
  {
    icon: Target,
    title: 'Misión',
    desc: 'Hacer que la aviación privada en Paraguay sea accesible, transparente y simple de contratar, con el mismo estándar de servicio que las plataformas internacionales.',
  },
  {
    icon: Eye,
    title: 'Visión',
    desc: 'Ser la plataforma de referencia para volar dentro del Cono Sur, conectando Paraguay con Argentina, Brasil, Uruguay y Bolivia en una sola experiencia.',
  },
  {
    icon: Globe2,
    title: 'Presencia',
    desc: 'Base operativa en Asunción y red de operadores en los ocho aeropuertos principales del país, con alcance regional para vuelos internacionales bajo demanda.',
  },
];

const MILESTONES = [
  { label: 'Base principal', value: 'Asunción (SGAS)' },
  { label: 'Aeropuertos operados', value: '8 en todo el país' },
  { label: 'Tipos de aeronave', value: 'Jet, turbohélice y helicóptero' },
  { label: 'Atención', value: 'Concierge 24/7' },
];

export default function SobreNosotros() {
  usePageMeta(
    'Sobre Nosotros',
    'VOLA es la plataforma de aviación privada de Paraguay: misión, visión y presencia en el Cono Sur.'
  );

  return (
    <>
      <PageHeader
        eyebrow="Sobre nosotros"
        title="Aviación privada, sin fricción"
        description="Nacimos para resolver algo concreto: en Paraguay, contratar un vuelo privado seguía dependiendo de llamadas, contactos y respuestas que tardaban días. VOLA lo convierte en una gestión de minutos."
        image={HERO_IMAGE}
      />

      <section className="section">
        <div className="shell">
          <div className="grid gap-5 md:grid-cols-3">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={i * 0.07} className="card-clean card-clean-hover p-7 md:p-8">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-ink-900 text-white">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <h2 className="mb-3 font-display text-lg font-bold text-ink-900">{p.title}</h2>
                  <p className="text-sm leading-relaxed text-gray-500">{p.desc}</p>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-16 rounded-3xl bg-ink-950 p-8 md:p-12">
            <p className="eyebrow mb-8 !text-white/40">En números</p>
            <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {MILESTONES.map((m) => (
                <div key={m.label}>
                  <dt className="mb-2 text-xs text-white/40">{m.label}</dt>
                  <dd className="font-display text-lg font-bold leading-snug text-white">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="mt-16 max-w-3xl">
            <h2 className="h-section mb-6 font-display font-bold text-ink-900">
              Cómo trabajamos
            </h2>
            <div className="space-y-5 text-base leading-relaxed text-gray-500">
              <p>
                VOLA no opera aeronaves propias: trabajamos como plataforma de intermediación
                con operadores aéreos certificados. Eso nos permite elegir, para cada vuelo, la
                aeronave y tripulación que mejor se ajustan a la ruta, sin las limitaciones de
                una flota fija.
              </p>
              <p>
                Cada solicitud pasa por un concierge que verifica disponibilidad real,
                condiciones meteorológicas y habilitaciones antes de confirmar una tarifa.
                Las cotizaciones que ves en el sitio son estimaciones de referencia: el precio
                en firme siempre lo confirma una persona.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
