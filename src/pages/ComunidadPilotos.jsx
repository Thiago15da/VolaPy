import { useState } from 'react';
import {
  BadgeCheck,
  Award,
  Mountain,
  MessageSquare,
  CalendarClock,
  Users,
  Check,
  ArrowRight,
  Radio,
  ShieldQuestion,
} from 'lucide-react';
import { LICENSE_TYPES, buildWhatsAppUrl, formatPilotMessage } from '../data';
import { useT } from '../LanguageContext';
import PageHeader from '../components/PageHeader';
import { Reveal } from '../motion';
import usePageMeta from '../usePageMeta';

const BADGES = [
  {
    icon: BadgeCheck,
    title: 'Licencia DINAC Verificada',
    desc: 'Se otorga tras contrastar la licencia del piloto con su habilitación vigente ante la DINAC.',
    tone: 'green',
  },
  {
    icon: Award,
    title: 'Capitán +1000hs',
    desc: 'Para pilotos al mando que acreditan más de mil horas de vuelo registradas en bitácora.',
    tone: 'gold',
  },
  {
    icon: Mountain,
    title: 'Piloto Habilitado Chaco',
    desc: 'Experiencia comprobada en pistas no pavimentadas y operación en el Chaco paraguayo.',
    tone: 'slate',
  },
];

const TONES = {
  green: 'bg-signal-green/10 text-signal-green',
  gold: 'bg-gold-400/15 text-gold-600',
  slate: 'bg-slate-500/10 text-slate-500',
};

const FEED = [
  { code: 'ZP-VLA', route: 'SGAS → SGES', when: 'Mañana 08:30', seats: 'Copiloto requerido' },
  { code: 'ZP-VLB', route: 'SGAS → SGFI', when: 'Jue 14:00', seats: 'Capitán asignado' },
  { code: 'ZP-VLE', route: 'SGEN → SGAS', when: 'Vie 09:15', seats: 'Abierto' },
];

const CHAT = [
  { who: 'Cap. R. Giménez', msg: '¿Alguien con reporte de pista en SGFI esta semana?' },
  { who: 'Cap. M. Duarte', msg: 'Volé ayer. Umbral 02 en buen estado, viento cruzado fuerte.' },
  { who: 'Cap. R. Giménez', msg: 'Gracias, ajusto el briefing.' },
];

/** Mockup del panel de pilotos, en CSS puro: sin imágenes ni dependencias. */
function DashboardMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-950 shadow-lift">
      {/* Barra de ventana */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 font-display text-xs font-bold tracking-[0.06em] text-white/70">
          VOLA · PILOT DASHBOARD
        </span>
      </div>

      <div className="grid gap-px bg-white/8 sm:grid-cols-[1.25fr_1fr]">
        {/* Asignación de vuelos */}
        <div className="bg-ink-950 p-5">
          <p className="mb-4 flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.12em] text-white/35">
            <CalendarClock size={12} />
            Asignación de vuelos
          </p>
          <ul className="space-y-2">
            {FEED.map((f) => (
              <li key={f.code} className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-sm font-bold text-white">{f.route}</span>
                  <span className="shrink-0 text-[0.625rem] text-white/40">{f.code}</span>
                </div>
                <div className="mt-1.5 flex items-center justify-between gap-3">
                  <span className="text-xs text-white/45">{f.when}</span>
                  <span className="rounded-full bg-white/8 px-2 py-0.5 text-[0.625rem] text-white/60">
                    {f.seats}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat global */}
        <div className="bg-ink-950 p-5">
          <p className="mb-4 flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.12em] text-white/35">
            <MessageSquare size={12} />
            Chat global
          </p>
          <ul className="space-y-3">
            {CHAT.map((c, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/8 text-[0.625rem] font-bold text-white/60">
                  {c.who.split(' ').pop()[0]}
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.625rem] text-white/40">{c.who}</span>
                  <span className="block text-xs leading-relaxed text-white/75">{c.msg}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-lg border border-white/10 px-3 py-2 text-[0.6875rem] text-white/25">
            Escribí un mensaje…
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ComunidadPilotos() {
  const t = useT();
  usePageMeta(
    'Comunidad de Pilotos',
    'La red exclusiva para aviadores y capitanes ejecutivos en Paraguay. Pre-registro abierto.'
  );

  const [form, setForm] = useState({ name: '', phone: '', hours: '', license: LICENSE_TYPES[0] });
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    window.open(buildWhatsAppUrl(formatPilotMessage(form)), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  const input =
    'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder-gray-400 outline-none transition-colors duration-300 focus:border-ink-900';

  return (
    <>
      <PageHeader
        eyebrow={t('community.eyebrow')}
        title={t('community.title')}
        description={t('community.lead')}
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-xs font-semibold text-white">
          <Radio size={13} />
          Pre-registro abierto
        </span>
      </PageHeader>

      {/* Insignias */}
      <section className="section">
        <div className="shell">
          <Reveal className="mb-10 max-w-2xl">
            <h2 className="h-section font-display font-bold text-ink-900">
              {t('community.badgesTitle')}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-500">{t('community.badgesLead')}</p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BADGES.map((b, i) => {
              const Icon = b.icon;
              return (
                <Reveal key={b.title} delay={i * 0.07} className="card-clean card-clean-hover p-7">
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${TONES[b.tone]}`}
                  >
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-3 font-display text-lg font-bold text-ink-900">{b.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{b.desc}</p>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-8 flex items-start gap-3 rounded-2xl border border-gray-200/80 bg-cloud-100 p-5">
            <ShieldQuestion size={16} className="mt-0.5 shrink-0 text-gray-400" />
            <p className="text-sm leading-relaxed text-gray-500">
              Las insignias son distintivos internos de la plataforma, otorgados tras validar el
              perfil del piloto. No sustituyen ni equivalen a una certificación oficial: la
              habilitación de licencias la emite exclusivamente la DINAC.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mockup del dashboard */}
      <section className="section bg-ink-950">
        <div className="shell">
          <Reveal className="mb-10 max-w-2xl">
            <p className="eyebrow mb-4 !text-white/40">Plataforma</p>
            <h2 className="h-section font-display font-bold text-white">
              {t('community.dashboardTitle')}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              {t('community.dashboardLead')}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <DashboardMock />
          </Reveal>
        </div>
      </section>

      {/* Pre-registro */}
      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-4">Sumate</p>
            <h2 className="h-section font-display font-bold text-ink-900">
              {t('community.formTitle')}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-500">{t('community.formLead')}</p>

            <ul className="mt-8 space-y-4">
              {[
                { icon: Users, text: 'Acceso prioritario a la primera generación de miembros.' },
                { icon: CalendarClock, text: 'Notificaciones de vuelos que buscan tripulación.' },
                { icon: MessageSquare, text: 'Canal directo con otros capitanes de la red.' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-cloud-100 text-gray-500">
                    <Icon size={13} />
                  </span>
                  <span className="text-sm leading-relaxed text-gray-600">{text}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card-clean p-7 shadow-card md:p-9">
              {sent ? (
                <div className="rounded-xl border border-signal-green/25 bg-signal-green/8 p-6">
                  <p className="flex items-center gap-2 font-semibold text-signal-green">
                    <Check size={18} />
                    {t('community.sent')}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {t('community.sentDesc')}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-4 text-sm text-gray-400 transition-colors hover:text-ink-900"
                  >
                    {t('community.another')}
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div>
                    <label htmlFor="p-name" className="field-label">
                      {t('common.name')}
                    </label>
                    <input
                      id="p-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={set('name')}
                      placeholder="Nombre y apellido"
                      className={input}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="p-phone" className="field-label">
                        {t('common.phone')}
                      </label>
                      <input
                        id="p-phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={set('phone')}
                        placeholder="+595 9xx xxx xxx"
                        className={input}
                      />
                    </div>
                    <div>
                      <label htmlFor="p-hours" className="field-label">
                        {t('community.hours')}
                      </label>
                      <input
                        id="p-hours"
                        type="number"
                        min="0"
                        step="10"
                        required
                        value={form.hours}
                        onChange={set('hours')}
                        placeholder="Ej. 1200"
                        className={input}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="p-license" className="field-label">
                      {t('community.license')}
                    </label>
                    <select
                      id="p-license"
                      value={form.license}
                      onChange={set('license')}
                      className={`${input} cursor-pointer`}
                    >
                      {LICENSE_TYPES.map((l) => (
                        <option key={l}>{l}</option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    {t('community.submit')}
                    <ArrowRight size={16} />
                  </button>

                  <p className="text-xs leading-relaxed text-gray-400">
                    {t('community.privacyNote')}
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
