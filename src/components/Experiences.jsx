import { motion } from 'framer-motion';
import { Heart, Gamepad2, Trees, Sparkles, ArrowUpRight } from 'lucide-react';
import { EXPERIENCES, buildWhatsAppUrl, formatExperienceMessage } from '../data';
import { Reveal, stagger, fadeUp } from '../motion';

const ICONS = { Heart, Gamepad2, Trees, Sparkles };

export default function Experiences() {
  return (
    <section id="experiencias" className="py-20 md:py-32">
      <div className="max-w-container mx-auto px-5 sm:px-8">
        <Reveal className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400 mb-4">
              Experiencias VIP & Estilo de Vida
            </p>
            <h2
              className="font-display font-bold leading-[1.08] tracking-tight text-ink-900"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}
            >
              Eleva cada momento
            </h2>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
            Experiencias exclusivas diseñadas para generar recuerdos inolvidables.
            Coordinación completa a través de nuestro concierge.
          </p>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -40px 0px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {EXPERIENCES.map((exp) => {
            const Icon = ICONS[exp.icon] || Sparkles;
            return (
              <motion.article
                key={exp.id}
                variants={fadeUp}
                className="card-clean card-clean-hover overflow-hidden flex flex-col group"
              >
                <div className="relative h-56 overflow-hidden bg-cloud-200">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-white bg-ink-900/80 backdrop-blur-sm rounded-full px-3 py-1">
                    {exp.tag}
                  </span>
                </div>

                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-cloud-100 text-ink-900">
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display font-bold text-lg text-ink-900 leading-snug">
                      {exp.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-1">{exp.desc}</p>

                  <a
                    href="#contacto"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(buildWhatsAppUrl(formatExperienceMessage(exp)), '_blank', 'noopener,noreferrer');
                    }}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-gray-500 transition-colors"
                  >
                    Reservar experiencia
                    <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
