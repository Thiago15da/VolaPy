import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { buildWhatsAppUrl } from '../data';
import { Reveal, stagger, fadeUp } from '../motion';

const NAV = [
  { label: 'Flota', href: '#flota' },
  { label: 'Experiencias', href: '#experiencias' },
  { label: 'Empty Legs', href: '#empty-legs' },
  { label: 'Contacto', href: '#contacto' },
];

const LEGAL = [
  { label: 'Términos y Condiciones', href: '#' },
  { label: 'Política de Privacidad', href: '#' },
  { label: 'Política de Cookies', href: '#' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contacto" className="bg-cloud-100 border-t border-gray-200/70 pt-20 pb-10">
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
              Concierge
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display font-bold leading-[1.1] tracking-tight text-ink-900 mb-4"
              style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3rem)' }}
            >
              ¿Listo para elevar<br />
              <span className="text-gray-400">su próximo viaje?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 max-w-md mx-auto mb-8">
              Nuestro equipo está disponible las 24 horas para diseñar la experiencia de vuelo perfecta.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={buildWhatsAppUrl('Hola VOLA, me gustaría información sobre vuelos privados.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary shadow-lift"
              >
                Contactar Concierge
              </a>
              <a href="tel:+595985606780" className="btn-outline">
                +595 985 606 780
              </a>
            </motion.div>
          </motion.div>
        </Reveal>

        {/* Footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          <div className="md:col-span-2">
            <span className="font-display text-2xl font-extrabold tracking-[0.06em] text-ink-900">VOLA</span>
            <p className="text-sm text-gray-500 mt-3 max-w-xs leading-relaxed">
              El nuevo estándar en aviación privada y helicópteros en Paraguay.
              Vuelos charter domésticos bajo demanda, con concierge dedicado 24/7.
            </p>
            <p className="text-xs text-gray-400 mt-4">vola.com.py</p>
          </div>

          <div>
            <h4 className="text-[0.625rem] uppercase tracking-[0.12em] text-gray-400 mb-4">Navegación</h4>
            <ul className="space-y-3">
              {NAV.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-gray-500 hover:text-ink-900 transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[0.625rem] uppercase tracking-[0.12em] text-gray-400 mb-4">Contacto</h4>
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
                <a href="mailto:concierge@vola.com.py" className="flex items-center gap-2 text-sm text-gray-500 hover:text-ink-900 transition-colors">
                  <Mail size={14} />
                  concierge@vola.com.py
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={14} />
                Asunción, Paraguay
              </li>
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8 border-t border-gray-200/70">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL.map((l) => (
              <a key={l.label} href={l.href} className="text-xs text-gray-400 hover:text-ink-900 transition-colors">
                {l.label}
              </a>
            ))}
          </div>
          <p className="text-xs text-gray-400">© {year} VOLA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
