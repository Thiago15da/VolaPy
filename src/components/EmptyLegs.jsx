import { motion } from 'framer-motion';
import { Plane, ArrowRight, Tag } from 'lucide-react';
import { EMPTY_LEGS, buildWhatsAppUrl, formatEmptyLegMessage } from '../data';
import { Reveal, stagger, fadeUp } from '../motion';

export default function EmptyLegs() {
  return (
    <section id="empty-legs" className="py-20 md:py-32">
      <div className="max-w-container mx-auto px-5 sm:px-8">
        <Reveal className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400 mb-4">
              Empty Legs
            </p>
            <h2
              className="font-display font-bold leading-[1.08] tracking-tight text-ink-900"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}
            >
              Vuelos de oportunidad
            </h2>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
            Aprovecha rutas ya programadas con asientos disponibles a una fracción del costo regular.
            Disponibilidad limitada y sujeta a confirmación.
          </p>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -40px 0px' }}
          className="space-y-3"
        >
          {EMPTY_LEGS.map((leg) => (
            <motion.div
              key={leg.id}
              variants={fadeUp}
              className="card-clean card-clean-hover p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-5 md:gap-8 group"
            >
              {/* Route */}
              <div className="flex items-center gap-4 md:gap-6 flex-1 min-w-0">
                <div className="flex flex-col">
                  <span className="text-[0.625rem] uppercase tracking-[0.1em] text-gray-400 mb-0.5">Origen</span>
                  <span className="font-display font-semibold text-base md:text-lg text-ink-900 truncate">{leg.from}</span>
                </div>
                <div className="flex-shrink-0 flex items-center text-gray-300">
                  <Plane size={18} className="rotate-90" />
                  <ArrowRight size={16} className="-ml-1" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[0.625rem] uppercase tracking-[0.1em] text-gray-400 mb-0.5">Destino</span>
                  <span className="font-display font-semibold text-base md:text-lg text-ink-900 truncate">{leg.to}</span>
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-6 md:gap-8 flex-wrap">
                <div className="flex flex-col">
                  <span className="text-[0.625rem] uppercase tracking-[0.1em] text-gray-400 mb-0.5">Fecha</span>
                  <span className="text-sm text-gray-600">{leg.date}</span>
                </div>
                <div className="hidden lg:flex flex-col">
                  <span className="text-[0.625rem] uppercase tracking-[0.1em] text-gray-400 mb-0.5">Aeronave</span>
                  <span className="text-sm text-gray-600">{leg.aircraft}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[0.625rem] uppercase tracking-[0.1em] text-gray-400 mb-0.5">Asientos</span>
                  <span className="text-sm text-gray-600">{leg.seats}</span>
                </div>
              </div>

              {/* Price + CTA */}
              <div className="flex items-center justify-between md:justify-end gap-5 md:pl-6 md:border-l border-gray-200/70">
                <div className="flex flex-col">
                  <span className="flex items-center gap-1.5 text-[0.625rem] uppercase tracking-[0.1em] text-emerald-600 mb-0.5">
                    <Tag size={11} />
                    Oportunidad · -{leg.discount}%
                  </span>
                  <span className="font-display font-bold text-xl text-ink-900">
                    ${leg.price.toLocaleString('en-US')}
                  </span>
                </div>
                <a
                  href="#contacto"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(buildWhatsAppUrl(formatEmptyLegMessage(leg)), '_blank', 'noopener,noreferrer');
                  }}
                  className="btn-outline !px-4 !py-2.5 whitespace-nowrap"
                >
                  Reservar
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
