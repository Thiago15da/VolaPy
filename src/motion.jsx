import { motion } from 'framer-motion';

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

export const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

export function Reveal({ children, className = '', delay = 0, ...rest }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1], delay },
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
