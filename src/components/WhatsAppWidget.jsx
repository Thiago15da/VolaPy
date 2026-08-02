import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { buildWhatsAppUrl } from '../data';

const QUICK_ACTIONS = [
  { label: 'Cotizar un vuelo charter', msg: 'Hola VOLA, quiero cotizar un vuelo charter.' },
  { label: 'Consultar vuelos panorámicos', msg: 'Hola VOLA, me interesan los vuelos panorámicos.' },
  { label: 'Hablar con un concierge', msg: 'Hola VOLA, quiero hablar con un concierge.' },
];

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3 print:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="w-[min(19rem,calc(100vw-2.5rem))] rounded-2xl bg-white border border-gray-200 shadow-lift overflow-hidden"
          >
            <div className="bg-ink-950 px-5 py-4">
              <p className="text-white font-semibold text-sm">Concierge VOLA</p>
              <p className="text-white/60 text-xs mt-0.5">Respondemos las 24 horas</p>
            </div>
            <div className="p-2">
              {QUICK_ACTIONS.map((a) => (
                <a
                  key={a.label}
                  href={buildWhatsAppUrl(a.msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-cloud-100 hover:text-ink-900 transition-colors duration-300"
                >
                  {a.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Cerrar ayuda' : 'Abrir ayuda por WhatsApp'}
        className="group flex items-center gap-2.5 rounded-full bg-signal-whatsapp pl-4 pr-5 py-3.5 text-white shadow-lift hover:brightness-105 transition-all duration-300"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
        <span className="text-sm font-semibold">{open ? 'Cerrar' : 'Ayuda'}</span>
      </button>
    </div>
  );
}
