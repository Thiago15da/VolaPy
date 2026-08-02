import { motion } from 'framer-motion';
import { stagger, fadeUp } from '../motion';

/** Encabezado común de las páginas internas. */
export default function PageHeader({ eyebrow, title, description, children, image }) {
  return (
    <header className="relative overflow-hidden border-b border-gray-200/70 bg-cloud-100">
      {image && (
        <div className="absolute inset-0" aria-hidden="true">
          <img src={image} alt="" className="w-full h-full object-cover opacity-[0.14]" />
          <div className="absolute inset-0 bg-gradient-to-b from-cloud-100/60 to-cloud-100" />
        </div>
      )}

      <div className="shell relative pt-32 pb-16 md:pt-40 md:pb-20">
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-3xl">
          {eyebrow && (
            <motion.p variants={fadeUp} className="eyebrow mb-5">
              {eyebrow}
            </motion.p>
          )}
          <motion.h1
            variants={fadeUp}
            className="h-section font-display font-extrabold text-ink-900 text-balance"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              variants={fadeUp}
              className="mt-5 text-base md:text-lg text-gray-500 leading-relaxed max-w-2xl"
            >
              {description}
            </motion.p>
          )}
          {children && (
            <motion.div variants={fadeUp} className="mt-8">
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </header>
  );
}
