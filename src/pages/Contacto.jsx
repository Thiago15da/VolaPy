import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Check } from 'lucide-react';
import { buildWhatsAppUrl, formatContactMessage, AIRPORTS } from '../data';
import { project, toPoints, toPath, VIEWBOX, PARAGUAY_OUTLINE, PARAGUAY_RIVER } from '../geo';
import PageHeader from '../components/PageHeader';
import { Reveal } from '../motion';
import usePageMeta from '../usePageMeta';

const SUBJECTS = [
  'Cotizar un vuelo charter',
  'Vuelos panorámicos',
  'Experiencias exclusivas',
  'Membresía VOLA',
  'Adquisición de aeronaves',
  'Otra consulta',
];

const CHANNELS = [
  { icon: Phone, label: 'Teléfono', value: '+595 985 606 780', href: 'tel:+595985606780' },
  { icon: Mail, label: 'Email', value: 'concierge@vola.com.py', href: 'mailto:concierge@vola.com.py' },
  { icon: MapPin, label: 'Base', value: 'Aeropuerto Silvio Pettirossi, Luque', href: null },
  { icon: Clock, label: 'Atención', value: '24 horas, todos los días', href: null },
];

const OUTLINE = toPoints(PARAGUAY_OUTLINE);
const RIVER = toPath(PARAGUAY_RIVER);

export default function Contacto() {
  usePageMeta('Contacto', 'Contactá al concierge de VOLA por WhatsApp, teléfono o email. Atención 24/7.');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: SUBJECTS[0],
    message: '',
  });
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    window.open(buildWhatsAppUrl(formatContactMessage(form)), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  const input =
    'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder-gray-400 outline-none transition-colors duration-300 focus:border-ink-900';

  return (
    <>
      <PageHeader
        eyebrow="Contacto"
        title="Hablemos de tu próximo vuelo"
        description="Escribinos y un concierge te responde. Si es urgente, WhatsApp es el canal más rápido."
      />

      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          {/* Formulario */}
          <Reveal>
            <div className="card-clean p-7 shadow-card md:p-9">
              <h2 className="font-display text-xl font-bold text-ink-900">Enviános tu consulta</h2>
              <p className="mb-7 mt-2 text-sm leading-relaxed text-gray-500">
                Completá el formulario y se abre WhatsApp con el mensaje listo para enviar.
              </p>

              {sent ? (
                <div className="rounded-xl border border-signal-green/25 bg-signal-green/10 p-6">
                  <p className="flex items-center gap-2 font-semibold text-signal-green">
                    <Check size={18} />
                    Abrimos WhatsApp con tu consulta
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    Si no se abrió automáticamente, escribinos al +595 985 606 780 o a
                    concierge@vola.com.py.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-4 text-sm text-gray-400 transition-colors hover:text-ink-900"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-name" className="field-label">
                        Nombre
                      </label>
                      <input
                        id="c-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={set('name')}
                        placeholder="Tu nombre"
                        className={input}
                      />
                    </div>
                    <div>
                      <label htmlFor="c-phone" className="field-label">
                        Teléfono
                      </label>
                      <input
                        id="c-phone"
                        type="tel"
                        value={form.phone}
                        onChange={set('phone')}
                        placeholder="+595 9xx xxx xxx"
                        className={input}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="c-email" className="field-label">
                      Email
                    </label>
                    <input
                      id="c-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={set('email')}
                      placeholder="tu@email.com"
                      className={input}
                    />
                  </div>

                  <div>
                    <label htmlFor="c-subject" className="field-label">
                      Asunto
                    </label>
                    <select
                      id="c-subject"
                      value={form.subject}
                      onChange={set('subject')}
                      className={`${input} cursor-pointer`}
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="c-message" className="field-label">
                      Mensaje
                    </label>
                    <textarea
                      id="c-message"
                      rows={4}
                      value={form.message}
                      onChange={set('message')}
                      placeholder="Contanos qué necesitás: ruta, fechas, cantidad de pasajeros…"
                      className={`${input} resize-y`}
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    <Send size={16} />
                    Enviar por WhatsApp
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Canales + mapa */}
          <div className="space-y-5">
            <Reveal delay={0.06}>
              <div className="card-clean divide-y divide-gray-200/70">
                {CHANNELS.map((c) => {
                  const Icon = c.icon;
                  const content = (
                    <div className="flex items-center gap-4 p-5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cloud-100 text-gray-500">
                        <Icon size={17} strokeWidth={1.5} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.625rem] uppercase tracking-[0.1em] text-gray-400">
                          {c.label}
                        </span>
                        <span className="block truncate text-sm font-medium text-ink-900">
                          {c.value}
                        </span>
                      </span>
                    </div>
                  );
                  return c.href ? (
                    <a
                      key={c.label}
                      href={c.href}
                      className="block transition-colors duration-300 hover:bg-cloud-100"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={c.label}>{content}</div>
                  );
                })}
              </div>
            </Reveal>

            {/* Mapa de cobertura, mismo motor SVG que el radar */}
            <Reveal delay={0.12}>
              <div className="card-clean overflow-hidden p-6">
                <p className="eyebrow mb-4">Cobertura</p>
                <svg
                  viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
                  className="h-auto w-full"
                  role="img"
                  aria-label="Mapa de Paraguay con los aeropuertos que opera VOLA"
                >
                  <polygon
                    points={OUTLINE}
                    fill="#F1F3F5"
                    stroke="#CED4DA"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path d={RIVER} fill="none" stroke="#A5C9E8" strokeWidth="2.5" strokeLinecap="round" />
                  {AIRPORTS.map((a) => {
                    const { x, y } = project(a.lng, a.lat);
                    return (
                      <g key={a.code}>
                        <circle cx={x} cy={y} r={a.hub ? 10 : 7} fill={a.hub ? '#0A1A34' : '#C41425'} />
                        <text x={x + 20} y={y + 6} fill="#6B7280" fontSize="22" fontWeight="600">
                          {a.city}
                        </text>
                      </g>
                    );
                  })}
                </svg>
                <p className="mt-3 text-xs text-gray-400">
                  Base principal en Asunción · 8 aeropuertos operados
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
