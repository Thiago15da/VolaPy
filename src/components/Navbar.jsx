import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const LINKS = [
  { label: 'Flota', href: '#flota' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Empty Legs', href: '#empty-legs' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass border-b border-white/[0.07]' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-container mx-auto px-5 sm:px-8 h-16 md:h-[72px] flex items-center justify-between">
          <a href="#inicio" className="font-display text-xl md:text-2xl font-extrabold tracking-[0.08em] text-white">
            VOLA
          </a>

          <div className="hidden md:flex items-center gap-9">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-sm text-gray-400 hover:text-white transition-colors duration-300"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+595985606780"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-gold-400 transition-colors duration-300"
            >
              <Phone size={15} />
              +595 985 606 780
            </a>
            <a
              href="#contacto"
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-white border border-white/10 bg-white/[0.03] hover:border-gold-400 hover:text-gold-400 transition-all duration-300"
            >
              Contactar Concierge
            </a>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 -mr-2 text-white"
            aria-label="Abrir menú"
          >
            <Menu size={22} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] md:hidden bg-ink-950/95 backdrop-blur-2xl flex flex-col"
          >
            <div className="h-16 flex items-center justify-between px-5">
              <span className="font-display text-xl font-extrabold tracking-[0.08em]">VOLA</span>
              <button onClick={() => setOpen(false)} className="p-2 -mr-2 text-white" aria-label="Cerrar menú">
                <X size={22} />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl font-semibold text-gray-400 hover:text-white transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="mt-4 px-7 py-3 rounded-lg text-sm font-medium text-ink-950 bg-gradient-to-br from-gold-200 to-gold-600"
              >
                Contactar Concierge
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
