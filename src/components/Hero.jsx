import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { HERO_IMAGE } from '../data';
import FlightQuoter from './FlightQuoter';
import { stagger, fadeUp } from '../motion';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-svh flex flex-col justify-center overflow-hidden pt-[72px]"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
          style={{ opacity: 0.28 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cloud-50/40 via-cloud-50/70 to-cloud-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-cloud-50/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-container mx-auto px-5 sm:px-8 w-full py-20 md:py-28">
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-3xl">
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 mb-6"
          >
            Aviación privada · Paraguay · vola.com.py
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display font-extrabold leading-[1.02] tracking-tightest text-ink-900 mb-6"
            style={{ fontSize: 'clamp(2.6rem, 7.5vw, 5.5rem)' }}
          >
            El tiempo es tu activo<br />
            <span className="text-gray-400">más valioso.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-gray-500 leading-relaxed mb-10 max-w-xl"
          >
            Vuelos charter domésticos y helicópteros de élite disponibles bajo demanda.
            Diseñamos cada vuelo alrededor de tu agenda — sin escalas, sin esperas.
          </motion.p>

          <FlightQuoter />
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-wrap gap-10 mt-16 pt-10 border-t border-gray-200/70"
        >
          {[
            { value: '24/7', label: 'Concierge dedicado' },
            { value: '7', label: 'Destinos domésticos' },
            { value: '<2h', label: 'Tiempo de respuesta' },
            { value: '100%', label: 'Privacidad garantizada' },
          ].map((s) => (
            <motion.div key={s.label} variants={fadeUp}>
              <p className="font-display font-bold text-2xl text-ink-900">{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#servicios"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-gray-400 hover:text-ink-900 transition-colors"
        aria-label="Desplazar abajo"
      >
        <span className="text-[0.625rem] tracking-[0.2em] uppercase">Explorar</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.a>
    </section>
  );
}
