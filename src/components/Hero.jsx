import { motion } from 'framer-motion';
import { HERO_IMAGE } from '../data';
import { useT } from '../LanguageContext';
import { stagger, fadeUp } from '../motion';
import FlightQuoter from './FlightQuoter';
import TrustBadge from './TrustBadge';

const STATS = [
  { value: '24/7', key: 'hero.stat.concierge' },
  { value: '8', key: 'hero.stat.airports' },
  { value: '<2h', key: 'hero.stat.response' },
  { value: '100%', key: 'hero.stat.privacy' },
];

export default function Hero() {
  const t = useT();

  return (
    <section className="relative">
      {/* Grilla dividida en desktop; en mobile se apila sin márgenes negativos */}
      <div className="grid lg:min-h-[46rem] lg:grid-cols-2">
        {/* Imagen: limpia, sin texto ni overlay encima */}
        <div className="relative h-64 overflow-hidden bg-ink-950 sm:h-80 lg:h-auto">
          <img
            src={HERO_IMAGE}
            alt="Cabina interior de un jet privado ejecutivo"
            fetchpriority="high"
            className="h-full w-full select-none object-cover object-center"
          />
          {/* Velo superior: el navbar es transparente en la home y su logo
              blanco tiene que leerse sobre cualquier foto. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink-950/55 to-transparent"
          />
          {/* Degradado sutil sólo en el borde de unión con el panel */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-ink-950/60 lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-24 lg:bg-gradient-to-r lg:from-transparent lg:to-ink-950/70"
          />
        </div>

        {/* Panel: título, prueba social y cotizador encajado */}
        <div className="relative flex items-center bg-slate-950/80 backdrop-blur-md">
          <div className="w-full px-5 py-12 sm:px-8 md:py-16 lg:px-12 xl:px-16">
            <motion.div variants={stagger} initial="hidden" animate="show" className="mx-auto max-w-xl">
              <motion.h1
                variants={fadeUp}
                className="text-balance font-display text-3xl font-extrabold leading-[1.08] tracking-tightest text-white sm:text-4xl xl:text-[2.9rem]"
              >
                {t('hero.title')}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-5 text-sm leading-relaxed text-white/65 md:text-base"
              >
                {t('hero.subtitle')}
              </motion.p>

              <motion.div variants={fadeUp} className="mt-6">
                <TrustBadge dark />
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8">
                <FlightQuoter />
              </motion.div>
            </motion.div>
          </div>
        </div>
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
            <motion.div key={s.key} variants={fadeUp}>
              <dt className="sr-only">{t(s.key)}</dt>
              <dd>
                <p className="font-display text-2xl font-bold text-ink-900">{s.value}</p>
                <p className="mt-0.5 text-xs text-gray-400">{t(s.key)}</p>
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
