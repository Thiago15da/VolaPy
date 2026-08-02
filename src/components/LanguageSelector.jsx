import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { CURRENCY, LANGUAGES } from '../i18n';

/**
 * Selector de idioma con indicador de moneda.
 *
 * La moneda no es seleccionable a propósito: todas las tarifas charter se
 * pactan en dólares, así que mostrar un conmutador implicaría una conversión
 * que no existe.
 */
export default function LanguageSelector({ solid = true, block = false }) {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  const trigger = solid
    ? 'text-gray-600 border-gray-200 hover:border-ink-900 hover:text-ink-900'
    : 'text-white/80 border-white/25 hover:border-white hover:text-white';

  return (
    <div ref={ref} className={`relative ${block ? 'w-full' : ''}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t('common.language')}
        className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-colors duration-300 ${trigger} ${
          block ? 'w-full justify-between' : ''
        }`}
      >
        <span className="flex items-center gap-2">
          <Globe size={15} />
          {current.short}
          <span className="opacity-40">|</span>
          <span title={t('common.currencyNote')}>{CURRENCY}</span>
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className={`absolute z-40 mt-2 w-52 rounded-2xl border border-gray-200/80 bg-white p-1.5 shadow-lift ${
              block ? 'left-0 right-0 w-auto' : 'right-0'
            }`}
          >
            {LANGUAGES.map((l) => (
              <li key={l.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={l.code === lang}
                  onClick={() => {
                    setLang(l.code);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-300 ${
                    l.code === lang
                      ? 'bg-cloud-100 font-semibold text-ink-900'
                      : 'text-gray-600 hover:bg-cloud-100 hover:text-ink-900'
                  }`}
                >
                  <span aria-hidden="true">{l.flag}</span>
                  <span className="flex-1 text-left">{l.label}</span>
                  <span className="text-xs text-gray-400">{l.short}</span>
                  {l.code === lang && <Check size={14} className="text-signal-green" />}
                </button>
              </li>
            ))}
            <li className="px-3 pb-1 pt-2">
              <p className="text-[0.6875rem] leading-relaxed text-gray-400">
                {t('common.currencyNote')}
              </p>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
