import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader as Loader2, Check, Plane, Calendar, Users, MapPin } from 'lucide-react';
import { ORIGIN, DESTINATIONS, buildWhatsAppUrl, formatQuoteMessage } from '../data';

const PASSENGERS = Array.from({ length: 12 }, (_, i) => i + 1);

const selectArrow =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")";

export default function FlightQuoter() {
  const [destination, setDestination] = useState(DESTINATIONS[0]);
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(null);

  const calculate = (e) => {
    e.preventDefault();
    setLoading(true);
    setPrice(null);
    setTimeout(() => {
      const amount = Math.floor(Math.random() * 3601) + 1200;
      setPrice(amount);
      setLoading(false);
    }, 1500);
  };

  const confirmWhatsApp = () => {
    const msg = formatQuoteMessage({ origin: ORIGIN, destination, date, passengers, price });
    window.open(buildWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  const reset = () => {
    setPrice(null);
    setDate('');
    setPassengers(1);
  };

  const labelBase = 'block text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-gray-400 mb-1.5';
  const fieldBase =
    'w-full bg-transparent text-sm text-ink-900 placeholder-gray-400 outline-none';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="w-full max-w-2xl"
    >
      <div className="card-clean p-1.5 shadow-lift">
        <form onSubmit={calculate} className="flex flex-col">
          {/* Row 1: Origin (fixed) / Destination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px">
            <div className="p-3.5">
              <label htmlFor="origin" className={labelBase}>
                Origen
              </label>
              <div className="relative flex items-center">
                <MapPin size={14} className="absolute left-0 text-gray-400 pointer-events-none" />
                <input
                  id="origin"
                  type="text"
                  value={ORIGIN}
                  readOnly
                  className={`${fieldBase} pl-5 cursor-default text-gray-500`}
                />
              </div>
            </div>

            <div className="p-3.5 sm:border-l border-gray-200/70">
              <label htmlFor="destination" className={labelBase}>
                Destino
              </label>
              <div className="relative flex items-center">
                <MapPin size={14} className="absolute left-0 text-gray-400 pointer-events-none" />
                <select
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className={`${fieldBase} pl-5 appearance-none cursor-pointer pr-6 bg-no-repeat`}
                  style={{ backgroundImage: selectArrow, backgroundPosition: 'right 0 center' }}
                >
                  {DESTINATIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Row 2: Date / Passengers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px border-t border-gray-200/70">
            <div className="p-3.5">
              <label htmlFor="date" className={labelBase}>
                Fecha
              </label>
              <div className="relative flex items-center">
                <Calendar size={14} className="absolute left-0 text-gray-400 pointer-events-none" />
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={`${fieldBase} pl-5`}
                />
              </div>
            </div>

            <div className="p-3.5 sm:border-l border-gray-200/70">
              <label htmlFor="passengers" className={labelBase}>
                Pasajeros
              </label>
              <div className="relative flex items-center">
                <Users size={14} className="absolute left-0 text-gray-400 pointer-events-none" />
                <select
                  id="passengers"
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className={`${fieldBase} pl-5 appearance-none cursor-pointer pr-6 bg-no-repeat`}
                  style={{ backgroundImage: selectArrow, backgroundPosition: 'right 0 center' }}
                >
                  {PASSENGERS.map((n) => (
                    <option key={n} value={n}>
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
                  className="flex items-center justify-center gap-3 py-3.5 rounded-xl bg-cloud-100 text-sm text-gray-500"
                >
                  <Loader2 size={18} className="animate-spin text-ink-900" />
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
                  <div className="flex-1 px-4 py-3 rounded-xl bg-cloud-100 border border-gray-200/70">
                    <p className="text-[0.625rem] uppercase tracking-[0.1em] text-gray-400 mb-0.5">
                      Tarifa Estimada
                    </p>
                    <p className="font-display text-2xl font-bold text-ink-900">
                      ${price.toLocaleString('en-US')} USD
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={confirmWhatsApp}
                    className="btn-primary shadow-lift"
                  >
                    <Check size={16} />
                    Confirmar vía WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={reset}
                    className="px-4 py-3.5 rounded-xl text-sm text-gray-400 hover:text-ink-900 transition-colors"
                  >
                    Nueva cotización
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="calc"
                  type="submit"
                  whileTap={{ scale: 0.98 }}
                  className="group btn-primary w-full"
                >
                  <Plane size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                  Calcular Vuelo
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
