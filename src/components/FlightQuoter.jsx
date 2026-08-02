import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpDown, Search, Loader as Loader2, Check, Users, Calendar } from 'lucide-react';
import {
  AIRPORTS,
  airportLabel,
  buildWhatsAppUrl,
  estimatePrice,
  findAirport,
  formatQuoteMessage,
} from '../data';
import { haversineKm } from '../geo';
import { useT } from '../LanguageContext';
import AirportCombobox from './AirportCombobox';

const PASSENGERS = Array.from({ length: 12 }, (_, i) => i + 1);

const selectArrow =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")";

export default function FlightQuoter() {
  const t = useT();
  const [params] = useSearchParams();

  const [tab, setTab] = useState('one-way');
  const [from, setFrom] = useState(AIRPORTS[0]);
  const [to, setTo] = useState(null);
  const [date, setDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState('');

  // Preselección desde la URL (?from=SGAS&to=SGFI), que es como llegan los
  // enlaces de "Cotizar esta ruta". Así el enlace queda compartible.
  useEffect(() => {
    const origin = findAirport(params.get('from'));
    const dest = findAirport(params.get('to'));
    if (origin) setFrom(origin);
    if (dest) setTo(dest);
    if (origin || dest) setQuote(null);
  }, [params]);

  const roundTrip = tab === 'round';

  const swap = () => {
    setFrom(to);
    setTo(from);
    setQuote(null);
  };

  const search = (e) => {
    e.preventDefault();
    if (!from || !to) return setError(t('quoter.errorEmpty'));
    if (from.code === to.code) return setError(t('quoter.errorSame'));

    setError('');
    setLoading(true);
    setQuote(null);

    // Espera deliberada: comunica que se está calculando la ruta.
    setTimeout(() => {
      setQuote({
        price: estimatePrice({ from, to, passengers, roundTrip }),
        km: Math.round(haversineKm(from, to)),
      });
      setLoading(false);
    }, 900);
  };

  const confirmWhatsApp = () => {
    const msg = formatQuoteMessage({
      origin: airportLabel(from),
      destination: airportLabel(to),
      date,
      returnDate,
      passengers,
      price: quote.price,
      roundTrip,
    });
    window.open(buildWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  const fieldWrap = 'p-4';
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-xl">
      {/* Tipo de viaje */}
      <div className="flex gap-1 border-b border-gray-100 p-2">
        {[
          { id: 'one-way', label: t('quoter.oneWay') },
          { id: 'round', label: t('quoter.roundTrip') },
        ].map((tabItem) => (
          <button
            key={tabItem.id}
            type="button"
            onClick={() => {
              setTab(tabItem.id);
              setQuote(null);
            }}
            aria-pressed={tab === tabItem.id}
            className={`relative rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors duration-300 ${
              tab === tabItem.id ? 'text-ink-900' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab === tabItem.id && (
              <motion.span
                layoutId="quoter-tab"
                className="absolute inset-0 rounded-xl bg-cloud-100"
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              />
            )}
            <span className="relative">{tabItem.label}</span>
          </button>
        ))}
      </div>

      <form onSubmit={search}>
        {/* Origen / Destino con intercambio */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2">
          <div className={`${fieldWrap} sm:border-r border-gray-100`}>
            <AirportCombobox
              id="quoter-origin"
              label={t('quoter.origin')}
              value={from}
              onChange={(a) => {
                setFrom(a);
                setQuote(null);
              }}
              placeholder={t('quoter.originPlaceholder')}
              exclude={to?.code}
            />
          </div>

          <button
            type="button"
            onClick={swap}
            aria-label={t('quoter.swap')}
            className="absolute left-1/2 top-1/2 z-20 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-soft transition-all duration-300 hover:scale-105 hover:border-ink-900 hover:text-ink-900 sm:flex"
          >
            <ArrowUpDown size={16} className="rotate-90" />
          </button>

          <div className={`${fieldWrap} relative border-t border-gray-100 sm:border-t-0`}>
            <AirportCombobox
              id="quoter-destination"
              label={t('quoter.destination')}
              value={to}
              onChange={(a) => {
                setTo(a);
                setQuote(null);
              }}
              placeholder={t('quoter.destinationPlaceholder')}
              exclude={from?.code}
            />
            <button
              type="button"
              onClick={swap}
              aria-label={t('quoter.swap')}
              className="absolute right-4 top-2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-soft sm:hidden"
            >
              <ArrowUpDown size={15} />
            </button>
          </div>
        </div>

        {/* Fechas y pasajeros */}
        <div
          className={`grid grid-cols-1 border-t border-gray-100 ${
            roundTrip ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
          }`}
        >
          <div className={`${fieldWrap} sm:border-r border-gray-100`}>
            <label htmlFor="quoter-date" className="field-label">
              {t('quoter.departDate')}
            </label>
            <div className="relative flex items-center">
              <Calendar size={15} className="pointer-events-none absolute left-0 text-gray-400" />
              <input
                id="quoter-date"
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent pl-6 text-sm font-medium text-ink-900 outline-none"
              />
            </div>
          </div>

          {roundTrip && (
            <div className={`${fieldWrap} border-t border-gray-100 sm:border-t-0 sm:border-r`}>
              <label htmlFor="quoter-return" className="field-label">
                {t('quoter.returnDate')}
              </label>
              <div className="relative flex items-center">
                <Calendar size={15} className="pointer-events-none absolute left-0 text-gray-400" />
                <input
                  id="quoter-return"
                  type="date"
                  min={date || today}
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full bg-transparent pl-6 text-sm font-medium text-ink-900 outline-none"
                />
              </div>
            </div>
          )}

          <div className={`${fieldWrap} border-t border-gray-100 sm:border-t-0`}>
            <label htmlFor="quoter-pax" className="field-label">
              {t('quoter.passengers')}
            </label>
            <div className="relative flex items-center">
              <Users size={15} className="pointer-events-none absolute left-0 text-gray-400" />
              <select
                id="quoter-pax"
                value={passengers}
                onChange={(e) => {
                  setPassengers(Number(e.target.value));
                  setQuote(null);
                }}
                className="w-full cursor-pointer appearance-none bg-transparent bg-no-repeat pl-6 pr-6 text-sm font-medium text-ink-900 outline-none"
                style={{ backgroundImage: selectArrow, backgroundPosition: 'right 0 center' }}
              >
                {PASSENGERS.map((n) => (
                  <option key={n} value={n}>
                    {n} {t(n === 1 ? 'quoter.passenger_one' : 'quoter.passenger_other')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Acción / resultado */}
        <div className="border-t border-gray-100 bg-cloud-100/60 p-2.5">
          {error && (
            <p role="alert" className="px-2 pb-2.5 text-sm text-signal-red">
              {error}
            </p>
          )}

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-3 rounded-xl py-4 text-sm text-gray-500"
              >
                <Loader2 size={18} className="animate-spin text-ink-900" />
                {t('quoter.calculating')}
              </motion.div>
            ) : quote ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-3"
              >
                <div className="rounded-xl border border-gray-200/70 bg-white px-4 py-3">
                  <p className="text-[0.625rem] uppercase tracking-[0.1em] text-gray-400">
                    {t('quoter.estimate')} · {quote.km.toLocaleString('es-PY')} km
                    {roundTrip ? ` ${t('quoter.roundTripSuffix')}` : ''}
                  </p>
                  <p className="font-display text-2xl font-bold text-ink-900">
                    ${quote.price.toLocaleString('en-US')} USD
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={confirmWhatsApp}
                    className="btn-primary flex-1 shadow-lift"
                  >
                    <Check size={16} />
                    {t('quoter.confirm')}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setQuote(null);
                      setError('');
                    }}
                    className="px-4 py-3 text-sm text-gray-400 transition-colors hover:text-ink-900"
                  >
                    {t('quoter.newSearch')}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.button
                key="search"
                type="submit"
                whileTap={{ scale: 0.985 }}
                className="btn-primary w-full !py-4"
              >
                <Search size={16} />
                {t('quoter.search')}
              </motion.button>
            )}
          </AnimatePresence>

          {quote && (
            <p className="px-2 pt-2.5 text-xs leading-relaxed text-gray-400">
              {t('quoter.disclaimer')}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
