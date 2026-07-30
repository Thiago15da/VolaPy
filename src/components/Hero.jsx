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
          style={{ opacity: 0.32 }}
        />
        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-ink-950/70 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-transparent to-transparent" />
        {/* Gold radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(201,169,98,0.06) 0%, transparent 70%)',
          }}
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-fade" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-container mx-auto px-5 sm:px-8 w-full py-20 md:py-28">
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-3xl">
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium uppercase tracking-[0.18em] text-gold-400 mb-6"
          >
            Aviación privada · Paraguay · vola.com.py
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display font-extrabold leading-[1.01] tracking-tightest text-white mb-6"
            style={{ fontSize: 'clamp(2.6rem, 7.5vw, 5.5rem)' }}
          >
            El tiempo es tu activo<br />
            <span className="gold-text">más valioso.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-gray-400 leading-relaxed mb-10 max-w-xl"
          >
            Jets ejecutivos y helicópteros de élite disponibles bajo demanda.
            Diseñamos cada vuelo alrededor de tu agenda — sin escalas, sin esperas.
          </motion.p>

          <FlightQuoter />
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-wrap gap-10 mt-16 pt-10 border-t border-white/[0.07]"
        >
          {[
            { value: '24/7', label: 'Concierge dedicado' },
            { value: '15+', label: 'Aeronaves disponibles' },
            { value: '<2h', label: 'Tiempo de respuesta' },
            { value: '100%', label: 'Privacidad garantizada' },
          ].map((s) => (
            <motion.div key={s.label} variants={fadeUp}>
              <p className="font-display font-bold text-2xl text-white">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-gray-600 hover:text-gold-400 transition-colors"
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
