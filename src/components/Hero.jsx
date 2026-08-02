import { motion } from 'framer-motion';
import { HERO_IMAGE } from '../data';
import { stagger, fadeUp } from '../motion';
import FlightQuoter from './FlightQuoter';
import TrustBadge from './TrustBadge';

const STATS = [
  { value: '24/7', label: 'Concierge dedicado' },
  { value: '8', label: 'Aeropuertos operados' },
  { value: '<2h', label: 'Tiempo de respuesta' },
  { value: '100%', label: 'Privacidad garantizada' },
];

export default function Hero() {
  return (
    <section className="relative">
      {/* Lienzo de la imagen */}
      <div className="relative flex min-h-[34rem] items-center justify-center overflow-hidden md:min-h-[42rem]">
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          fetchpriority="high"
          className="absolute inset-0 h-full w-full select-none object-cover object-center"
        />
        {/* Capas de contraste: el titular debe leerse sobre cualquier foto */}
        <div className="absolute inset-0 bg-ink-950/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/25 to-ink-950/80" />

        <div className="shell relative w-full pt-28 pb-44 text-center md:pt-36 md:pb-56">
          <motion.div variants={stagger} initial="hidden" animate="show" className="mx-auto max-w-4xl">
            <motion.h1
              variants={fadeUp}
              className="h-display text-balance font-display font-extrabold text-white"
            >
              La plataforma líder en jets y vuelos privados en Paraguay
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg"
            >
              Charter doméstico y helicópteros bajo demanda. Cotizá tu ruta en segundos y
              coordiná el vuelo con un concierge dedicado.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex justify-center">
              <TrustBadge dark />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Cotizador flotante, superpuesto al borde inferior de la imagen */}
      <div className="shell relative z-10 -mt-32 md:-mt-40">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto max-w-4xl"
        >
          <FlightQuoter />
        </motion.div>
      </div>

      {/* Franja de indicadores */}
      <div className="shell mt-14 md:mt-20">
        <motion.dl
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-8 border-t border-gray-200/70 pt-10 md:grid-cols-4"
        >
          {STATS.map((s) => (
            <motion.div key={s.label} variants={fadeUp}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <p className="font-display text-2xl font-bold text-ink-900">{s.value}</p>
                <p className="mt-0.5 text-xs text-gray-400">{s.label}</p>
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
