import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Plane } from 'lucide-react';
import { FREQUENT_ROUTES, findAirport } from '../data';
import { useT } from '../LanguageContext';
import { Reveal, stagger, fadeUp } from '../motion';

/**
 * Reemplaza al listado de empty legs. Cada tarjeta enlaza al cotizador con
 * la ruta ya cargada por query params, de modo que el enlace se puede
 * compartir y sigue funcionando pegado en un chat.
 */
export default function FrequentRoutes() {
  const t = useT();

  return (
    <section id="rutas" className="section">
      <div className="shell">
        <Reveal className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">{t('routes.eyebrow')}</p>
            <h2 className="h-section font-display font-bold text-ink-900">{t('routes.title')}</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-gray-500">{t('routes.lead')}</p>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -40px 0px' }}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {FREQUENT_ROUTES.map((route) => {
            const from = findAirport(route.from);
            const to = findAirport(route.to);
            return (
              <motion.article
                key={route.id}
                variants={fadeUp}
                className="card-clean card-clean-hover group flex flex-col overflow-hidden"
              >
                <div className="relative h-40 overflow-hidden bg-cloud-200">
                  <img
                    src={route.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-ink-900 backdrop-blur-sm">
                    <Clock size={11} />
                    {route.duration}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  {/* Ruta */}
                  <div className="flex items-center gap-3">
                    <div className="min-w-0">
                      <p className="font-display text-lg font-bold leading-tight text-ink-900">
                        {from.city}
                      </p>
                      <p className="text-[0.625rem] font-semibold tracking-wide text-gray-400">
                        {from.code}
                      </p>
                    </div>
                    <ArrowRight size={16} className="shrink-0 text-gray-300" />
                    <div className="min-w-0">
                      <p className="truncate font-display text-lg font-bold leading-tight text-ink-900">
                        {to.city}
                      </p>
                      <p className="text-[0.625rem] font-semibold tracking-wide text-gray-400">
                        {to.code}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-gray-500">{route.blurb}</p>

                  <dl className="mt-5 space-y-2 border-t border-gray-200/70 pt-4">
                    <div className="flex items-center justify-between text-sm">
                      <dt className="flex items-center gap-1.5 text-gray-400">
                        <Clock size={13} />
                        {t('routes.flightTime')}
                      </dt>
                      <dd className="font-medium text-ink-900">{route.duration}</dd>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <dt className="flex items-center gap-1.5 text-gray-400">
                        <Plane size={13} />
                        {t('routes.aircraft')}
                      </dt>
                      <dd className="font-medium text-ink-900">{route.aircraft}</dd>
                    </div>
                  </dl>

                  <Link
                    to={`/taxi-aereo?from=${route.from}&to=${route.to}`}
                    className="btn-primary mt-6 w-full"
                  >
                    {t('routes.quote')}
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
