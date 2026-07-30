import { motion } from 'framer-motion';
import { ShieldCheck, Clock, ConciergeBell } from 'lucide-react';
import { Reveal, stagger, fadeUp } from '../motion';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Privacidad Absoluta',
    desc: 'Discreción operacional garantizada en cada etapa del viaje. Sin registros públicos, sin exponer tu itinerario.',
  },
  {
    icon: Clock,
    title: 'Flexibilidad Total',
    desc: 'Vuela a tu hora. Cambios de última hora y rutas a medida sin las restricciones de la aviación comercial.',
  },
  {
    icon: ConciergeBell,
    title: 'Concierge 24/7',
    desc: 'Catering premium, traslados terrestres y asistencia dedicada — antes, durante y después de cada vuelo.',
  },
];

export default function Features() {
  return (
    <section id="servicios" className="py-20 md:py-32">
      <div className="max-w-container mx-auto px-5 sm:px-8">
        <Reveal className="max-w-2xl mb-14 md:mb-20">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-gold-400 mb-4">
            La experiencia VOLA
          </p>
          <h2 className="font-display font-bold leading-[1.08] tracking-tight text-white mb-5"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
            Más que un vuelo.<br />
            <span className="gold-text">Una declaración.</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Cada detalle está curado por nuestro equipo de concierge especializado en
            aviación corporativa de alto nivel.
          </p>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -40px 0px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="card-surface card-surface-hover rounded-2xl p-7 md:p-8"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gold-400/10 text-gold-400 mb-5">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-3">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
