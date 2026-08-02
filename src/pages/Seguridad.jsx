import { ShieldCheck, Wrench, BadgeCheck, ClipboardCheck } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import AviationWeather from '../components/AviationWeather';
import { Reveal } from '../motion';
import usePageMeta from '../usePageMeta';

const STANDARDS = [
  {
    icon: BadgeCheck,
    title: 'Operadores habilitados por la DINAC',
    desc: 'Volamos únicamente con operadores que cuentan con Certificado de Explotador de Servicios Aéreos vigente ante la Dirección Nacional de Aeronáutica Civil.',
  },
  {
    icon: Wrench,
    title: 'Mantenimiento programado',
    desc: 'Cada aeronave sigue el programa de mantenimiento del fabricante, con inspecciones documentadas y trazables por número de serie.',
  },
  {
    icon: ClipboardCheck,
    title: 'Tripulaciones certificadas',
    desc: 'Pilotos con licencia comercial vigente, habilitación por tipo de aeronave y controles médicos aeronáuticos al día.',
  },
  {
    icon: ShieldCheck,
    title: 'Verificación previa a cada vuelo',
    desc: 'Antes de confirmar, el concierge valida habilitaciones, condiciones meteorológicas y estado operativo de la aeronave asignada.',
  },
];

const CHECKLIST = [
  'Certificado de aeronavegabilidad vigente',
  'Seguro de responsabilidad civil y pasajeros',
  'Licencia y habilitación por tipo del piloto al mando',
  'Certificado médico aeronáutico vigente',
  'Plan de vuelo presentado y autorizado',
  'Briefing meteorológico previo al despegue',
];

export default function Seguridad() {
  usePageMeta(
    'Seguridad',
    'Estándares de seguridad de VOLA: operadores certificados DINAC, mantenimiento de flota y certificación de pilotos.'
  );

  return (
    <>
      <PageHeader
        eyebrow="Seguridad"
        title="La seguridad no es un diferencial, es el piso"
        description="Trabajamos exclusivamente con operadores certificados y verificamos las condiciones de cada vuelo antes de confirmarlo. Así lo hacemos."
      />

      <section className="section">
        <div className="shell">
          <div className="grid gap-5 md:grid-cols-2">
            {STANDARDS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={i * 0.06} className="card-clean card-clean-hover p-7 md:p-8">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-signal-green/10 text-signal-green">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <h2 className="mb-3 font-display text-lg font-bold text-ink-900">{s.title}</h2>
                  <p className="text-sm leading-relaxed text-gray-500">{s.desc}</p>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-16 grid gap-10 rounded-3xl bg-cloud-100 p-8 md:grid-cols-2 md:p-12">
            <div>
              <p className="eyebrow mb-4">Verificación</p>
              <h2 className="h-section font-display font-bold text-ink-900">
                Qué se controla antes de cada despegue
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-500">
                Ninguna reserva se confirma sin que estos puntos estén verificados por el
                operador y validados por nuestro equipo.
              </p>
            </div>
            <ul className="space-y-3.5">
              {CHECKLIST.map((c) => (
                <li key={c} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal-green/10">
                    <ShieldCheck size={12} className="text-signal-green" />
                  </span>
                  <span className="text-sm leading-relaxed text-gray-600">{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <AviationWeather />
    </>
  );
}
