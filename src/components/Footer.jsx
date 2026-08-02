import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { buildWhatsAppUrl, NAV_MENU, NAV_DIRECT } from '../data';
import { useT } from '../LanguageContext';
import Logo from './Logo';
import { Reveal, stagger, fadeUp } from '../motion';

export default function Footer() {
  const t = useT();
  const year = new Date().getFullYear();
  return (
    <footer className="bg-cloud-100 border-t border-gray-200/70 pt-20 pb-10">
      <div className="max-w-container mx-auto px-5 sm:px-8">
        {/* CTA block */}
        <Reveal className="card-clean p-8 md:p-14 text-center relative overflow-hidden mb-20 shadow-card">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400 mb-4"
            >
              {t('footer.conciergeEyebrow')}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display font-bold leading-[1.1] tracking-tight text-ink-900 mb-4"
              style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3rem)' }}
            >
              {t('footer.ctaTitle')}<br />
              <span className="text-gray-400">{t('footer.ctaTitle2')}</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 max-w-md mx-auto mb-8">
              {t('footer.ctaLead')}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={buildWhatsAppUrl('Hola VOLA, me gustaría información sobre vuelos privados.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary shadow-lift"
              >
                {t('nav.concierge')}
              </a>
              <a href="tel:+595985606780" className="btn-outline">
                +595 985 606 780
              </a>
            </motion.div>
          </motion.div>
        </Reveal>

        {/* Footer grid */}
        {/* 5 columnas sólo desde lg: en tablet la columna de contacto queda
            demasiado angosta para el email y desborda el ancho de página. */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          <div className="col-span-2">
            <Link to="/" aria-label="VOLA Paraguay — Inicio" className="inline-block">
              <Logo variant="dark" size="lg" withTagline />
            </Link>
            <p className="text-sm text-gray-500 mt-3 max-w-xs leading-relaxed">
              {t('footer.tagline')}
            </p>
            <p className="text-xs text-gray-400 mt-4">vola.com.py</p>
          </div>

          {NAV_MENU.map((group) => (
            <div key={group.key}>
              <h4 className="text-[0.625rem] uppercase tracking-[0.12em] text-gray-400 mb-4">
                {t(group.key)}
              </h4>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-sm text-gray-500 hover:text-ink-900 transition-colors"
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-[0.625rem] uppercase tracking-[0.12em] text-gray-400 mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={buildWhatsAppUrl('Hola VOLA, me gustaría una cotización.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-ink-900 transition-colors"
                >
                  <Phone size={14} />
                  +595 985 606 780
                </a>
              </li>
              <li>
                <a
                  href="mailto:concierge@vola.com.py"
                  className="flex items-start gap-2 text-sm text-gray-500 hover:text-ink-900 transition-colors"
                >
                  <Mail size={14} className="mt-0.5 shrink-0" />
                  <span className="min-w-0 break-all">concierge@vola.com.py</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={14} />
                Asunción, Paraguay
              </li>
            </ul>

            <h4 className="text-[0.625rem] uppercase tracking-[0.12em] text-gray-400 mt-8 mb-4">
              {t('nav.more')}
            </h4>
            <ul className="space-y-3">
              {NAV_DIRECT.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-gray-500 hover:text-ink-900 transition-colors"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8 border-t border-gray-200/70">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/politica-privacidad" className="text-xs text-gray-400 hover:text-ink-900 transition-colors">
              {t('nav.privacy')}
            </Link>
            <Link to="/seguridad" className="text-xs text-gray-400 hover:text-ink-900 transition-colors">
              {t('nav.safety')}
            </Link>
            <Link to="/contacto" className="text-xs text-gray-400 hover:text-ink-900 transition-colors">
              {t('nav.contact')}
            </Link>
          </div>
          <p className="text-xs text-gray-400">© {year} VOLA. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
