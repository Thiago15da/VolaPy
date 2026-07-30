import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader as Loader2, Check, Plane, Calendar, Users, MapPin } from 'lucide-react';
import { ORIGIN_OPTIONS, buildWhatsAppUrl, formatQuoteMessage } from '../data';

const PASSENGERS = Array.from({ length: 12 }, (_, i) => i + 1);

export default function FlightQuoter() {
  const [origin, setOrigin] = useState(ORIGIN_OPTIONS[0]);
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(null);
  const [error, setError] = useState('');

  const calculate = (e) => {
    e.preventDefault();
    if (!destination.trim()) {
      setError('destination');
      return;
    }
    setError('');
    setLoading(true);
    setPrice(null);
    setTimeout(() => {
      const amount = Math.floor(Math.random() * 14501) + 3500;
      setPrice(amount);
      setLoading(false);
    }, 1500);
  };

  const confirmWhatsApp = () => {
    const msg = formatQuoteMessage({ origin, destination, date, passengers, price });
    window.open(buildWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  const reset = () => {
    setPrice(null);
    setDestination('');
    setDate('');
    setPassengers(1);
  };

  const fieldBase =
    'w-full bg-transparent text-sm text-white placeholder-gray-600 outline-none';
  const labelBase =
    'block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-gray-500 mb-1.5';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="w-full max-w-2xl"
    >
      <div className="card-surface rounded-2xl p-1.5 backdrop-blur-md bg-ink-800/85 shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
        <form onSubmit={calculate} className="flex flex-col">
          {/* Row 1: Origin / Destination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px">
            <div className="p-3.5">
              <label htmlFor="origin" className={labelBase}>
                Origen
              </label>
              <div className="relative flex items-center">
                <MapPin size={14} className="absolute left-0 text-gray-600 pointer-events-none" />
                <select
                  id="origin"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className={`${fieldBase} pl-5 appearance-none cursor-pointer pr-6 bg-no-repeat`}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
                    backgroundPosition: 'right 0 center',
                  }}
                >
                  {ORIGIN_OPTIONS.map((o) => (
                    <option key={o} value={o} className="bg-ink-800 text-white">
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-3.5 sm:border-l border-white/[0.07]">
              <label htmlFor="destination" className={labelBase}>
                Destino
              </label>
              <div className="relative flex items-center">
                <MapPin size={14} className="absolute left-0 text-gray-600 pointer-events-none" />
                <input
                  id="destination"
                  type="text"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    if (error === 'destination') setError('');
                  }}
                  placeholder="Ej. Punta del Este"
                  autoComplete="off"
                  className={`${fieldBase} pl-5 ${
                    error === 'destination' ? 'text-red-400' : ''
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Row 2: Date / Passengers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px border-t border-white/[0.07]">
            <div className="p-3.5">
              <label htmlFor="date" className={labelBase}>
                Fecha
              </label>
              <div className="relative flex items-center">
                <Calendar size={14} className="absolute left-0 text-gray-600 pointer-events-none" />
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={`${fieldBase} pl-5 [color-scheme:dark]`}
                />
              </div>
            </div>

            <div className="p-3.5 sm:border-l border-white/[0.07]">
              <label htmlFor="passengers" className={labelBase}>
                Pasajeros
              </label>
              <div className="relative flex items-center">
                <Users size={14} className="absolute left-0 text-gray-600 pointer-events-none" />
                <select
                  id="passengers"
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className={`${fieldBase} pl-5 appearance-none cursor-pointer pr-6`}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
                    backgroundPosition: 'right 0 center',
                  }}
                >
                  {PASSENGERS.map((n) => (
                    <option key={n} value={n} className="bg-ink-800 text-white">
                      {n} {n === 1 ? 'pasajero' : 'pasajeros'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Submit / Result */}
          <div className="p-1.5 pt-2.5">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-3 py-3.5 rounded-xl bg-ink-700 text-sm text-gray-300"
                >
                  <Loader2 size={18} className="animate-spin text-gold-400" />
                  Calculando ruta óptima...
                </motion.div>
              ) : price !== null ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
                >
                  <div className="flex-1 px-4 py-3 rounded-xl bg-ink-700 border border-gold-400/20">
                    <p className="text-[0.625rem] uppercase tracking-[0.1em] text-gray-500 mb-0.5">
                      Tarifa Estimada
                    </p>
                    <p className="font-display text-2xl font-bold gold-text">
                      ${price.toLocaleString('en-US')} USD
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={confirmWhatsApp}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-ink-950 bg-gradient-to-br from-gold-200 to-gold-600 hover:from-gold-100 hover:to-gold-500 transition-all duration-300 shadow-[0_8px_32px_rgba(201,169,98,0.25)]"
                  >
                    <Check size={16} />
                    Confirmar vía WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={reset}
                    className="px-4 py-3.5 rounded-xl text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    Nueva cotización
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="calc"
                  type="submit"
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold text-ink-950 bg-gradient-to-br from-gold-200 to-gold-600 hover:from-gold-100 hover:to-gold-500 transition-all duration-300 shadow-[0_8px_32px_rgba(201,169,98,0.18)]"
                >
                  <Plane size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                  Calcular Vuelo
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </motion.button>
              )}
            </AnimatePresence>
            {error === 'destination' && (
              <p className="mt-2 text-xs text-red-400/90">Indique un destino para calcular la ruta.</p>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  );
}
