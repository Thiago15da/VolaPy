import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FLEET } from '../data';
import { Reveal, stagger, fadeUp } from '../motion';

export default function Fleet() {
  return (
    <section id="flota" className="py-20 md:py-32 bg-cloud-100">
      <div className="max-w-container mx-auto px-5 sm:px-8">
        <Reveal className="mb-12 md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400 mb-4">
            Nuestra flota
          </p>
          <h2
            className="font-display font-bold leading-[1.08] tracking-tight text-ink-900"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}
          >
            Aeronaves de élite, a su disposición
          </h2>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -40px 0px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {FLEET.map((jet) => (
            <motion.article
              key={jet.id}
              variants={fadeUp}
              className="card-clean card-clean-hover overflow-hidden flex flex-col group"
            >
              <div className="relative h-52 overflow-hidden bg-cloud-200">
                <img
                  src={jet.image}
                  alt={jet.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-ink-900 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  {jet.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display font-bold text-xl text-ink-900 mb-2">{jet.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{jet.blurb}</p>

                <dl className="mt-auto flex flex-wrap gap-x-6 gap-y-3 pt-4 border-t border-gray-200/70">
                  {jet.specs.map((s) => (
                    <div key={s.label}>
                      <dt className="text-[0.625rem] uppercase tracking-[0.08em] text-gray-400 mb-0.5">
                        {s.label}
                      </dt>
                      <dd className="font-display font-semibold text-sm text-ink-900">{s.value}</dd>
                    </div>
                  ))}
                </dl>

                <a
                  href="#contacto"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-gray-500 transition-colors"
                >
                  Solicitar disponibilidad
                  <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
