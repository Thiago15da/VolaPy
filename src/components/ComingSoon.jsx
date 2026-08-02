import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Clock } from 'lucide-react';
import { buildWhatsAppUrl, formatWaitlistMessage, SOON } from '../data';
import { Reveal } from '../motion';
import PageHeader from './PageHeader';
import usePageMeta from '../usePageMeta';

/**
 * Plantilla de las rutas aún no disponibles. En vez de una página vacía,
 * explica el producto y captura interés hacia el concierge por WhatsApp.
 */
export default function ComingSoon({ product, title, description, bullets = [], image, children }) {
  usePageMeta(title, description);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const msg = formatWaitlistMessage({ product, name, email });
    window.open(buildWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <>
      <PageHeader eyebrow={product} title={title} description={description} image={image}>
        <span className="badge-soon gap-1.5">
          <Clock size={11} />
          {SOON}
        </span>
      </PageHeader>

      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-16">
          {bullets.length > 0 && (
            <Reveal>
              <h2 className="font-display text-xl font-bold text-ink-900 mb-6">
                Qué vas a poder hacer
              </h2>
              <ul className="space-y-4">
                {bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal-green/10">
                      <Check size={12} className="text-signal-green" />
                    </span>
                    <span className="text-sm text-gray-600 leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          <Reveal delay={0.08}>
            <div className="card-clean p-7 md:p-8 shadow-card">
              <h2 className="font-display text-xl font-bold text-ink-900">Lista de espera</h2>
              <p className="text-sm text-gray-500 mt-2 mb-6 leading-relaxed">
                Dejanos tus datos y te avisamos apenas {product.toLowerCase()} esté disponible.
              </p>

              {sent ? (
                <div className="rounded-xl bg-signal-green/10 border border-signal-green/25 p-5">
                  <p className="flex items-center gap-2 text-sm font-semibold text-signal-green">
                    <Check size={16} />
                    Listo, abrimos WhatsApp
                  </p>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    Si no se abrió automáticamente, escribinos y te sumamos a la lista.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-4 text-sm text-gray-400 hover:text-ink-900 transition-colors"
                  >
                    Cargar otro contacto
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div>
                    <label htmlFor="cs-name" className="field-label">
                      Nombre
                    </label>
                    <input
                      id="cs-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder-gray-400 outline-none focus:border-ink-900 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="cs-email" className="field-label">
                      Email
                    </label>
                    <input
                      id="cs-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder-gray-400 outline-none focus:border-ink-900 transition-colors duration-300"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    Avisarme
                    <ArrowRight size={16} />
                  </button>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Al enviar se abre WhatsApp con tus datos listos para mandar al concierge.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>

        {children}

        <div className="shell mt-16">
          <Reveal className="card-clean p-7 md:p-9 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <p className="font-display text-lg font-bold text-ink-900">
                ¿Necesitás volar antes?
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Nuestro servicio de taxi aéreo ya está operativo en todo el país.
              </p>
            </div>
            <Link to="/taxi-aereo" className="btn-primary shrink-0">
              Ver taxi aéreo
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
