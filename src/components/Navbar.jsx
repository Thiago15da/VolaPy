import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { NAV_MENU, NAV_DIRECT } from '../data';
import { useT } from '../LanguageContext';
import Logo from './Logo';
import LanguageSelector from './LanguageSelector';

function Badge({ children }) {
  return <span className="badge-soon ml-2">{children}</span>;
}

function DesktopDropdown({ group, solid }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const closeTimer = useRef(null);

  // Un pequeño retardo al salir evita que el panel se cierre mientras el
  // puntero cruza el hueco entre el botón y el menú.
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };
  const cancelClose = () => clearTimeout(closeTimer.current);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

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

  const idle = solid ? 'text-gray-500 hover:text-ink-900' : 'text-white/80 hover:text-white';

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 text-sm transition-colors duration-300 ${idle}`}
      >
        {t(group.key)}
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-4"
          >
            <div className="w-72 rounded-2xl bg-white border border-gray-200/80 shadow-lift p-2">
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm transition-colors duration-300 ${
                      isActive
                        ? 'bg-cloud-100 text-ink-900 font-semibold'
                        : 'text-gray-600 hover:bg-cloud-100 hover:text-ink-900'
                    }`
                  }
                >
                  <span>{t(item.key)}</span>
                  {item.soon && <Badge>{t('common.soon')}</Badge>}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileAccordion({ group, onNavigate }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left font-display text-lg font-semibold text-ink-900"
      >
        {t(group.key)}
        <ChevronDown
          size={18}
          className={`text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-3">
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-2.5 pl-1 text-sm transition-colors ${
                      isActive ? 'text-ink-900 font-semibold' : 'text-gray-500'
                    }`
                  }
                >
                  <span>{t(item.key)}</span>
                  {item.soon && <Badge>{t('common.soon')}</Badge>}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Sólo la home tiene hero oscuro a sangre: ahí el navbar arranca transparente.
  const onDarkHero = pathname === '/';
  const solid = scrolled || !onDarkHero;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const linkIdle = solid ? 'text-gray-500 hover:text-ink-900' : 'text-white/80 hover:text-white';

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          solid ? 'bg-white/85 backdrop-blur-xl border-b border-gray-200/70' : 'bg-transparent'
        }`}
      >
        <nav className="shell h-16 md:h-[72px] flex items-center justify-between gap-6">
          <Link to="/" aria-label="VOLA Paraguay — Inicio" className="shrink-0">
            <Logo variant={solid ? 'dark' : 'light'} size="md" />
          </Link>

          <div className="hidden xl:flex items-center gap-7">
            {NAV_MENU.map((group) => (
              <DesktopDropdown key={group.key} group={group} solid={solid} />
            ))}
            {NAV_DIRECT.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center whitespace-nowrap text-sm transition-colors duration-300 ${
                    isActive
                      ? solid
                        ? 'text-ink-900 font-semibold'
                        : 'text-white font-semibold'
                      : linkIdle
                  }`
                }
              >
                {t(item.key)}
                {item.soon && <Badge>{t('common.soon')}</Badge>}
              </NavLink>
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-3">
            <LanguageSelector solid={solid} />
            <Link
              to="/contacto"
              className="whitespace-nowrap rounded-xl bg-brand-red px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-redDark"
            >
              {t('nav.concierge')}
            </Link>
          </div>

          <button
            onClick={() => setOpen(true)}
            className={`xl:hidden p-2 -mr-2 transition-colors duration-300 ${
              solid ? 'text-ink-900' : 'text-white'
            }`}
            aria-label={t('nav.openMenu')}
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
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] xl:hidden bg-white flex flex-col"
          >
            <div className="h-16 flex items-center justify-between px-5 border-b border-gray-200 shrink-0">
              <Link to="/" onClick={() => setOpen(false)} aria-label="VOLA Paraguay — Inicio">
                <Logo variant="dark" size="sm" />
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="p-2 -mr-2 text-ink-900"
                aria-label={t('common.close')}
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 pb-8">
              {NAV_MENU.map((group) => (
                <MobileAccordion key={group.key} group={group} onNavigate={() => setOpen(false)} />
              ))}

              {NAV_DIRECT.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-gray-100 py-4 font-display text-lg font-semibold text-ink-900"
                >
                  <span>{t(item.key)}</span>
                  {item.soon && <Badge>{t('common.soon')}</Badge>}
                </NavLink>
              ))}

              <div className="mt-8 space-y-3">
                <Link to="/contacto" onClick={() => setOpen(false)} className="btn-primary w-full">
                  {t('nav.concierge')}
                </Link>
                <a href="tel:+595985606780" className="btn-outline w-full">
                  <Phone size={15} />
                  +595 985 606 780
                </a>
                <LanguageSelector solid block />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
