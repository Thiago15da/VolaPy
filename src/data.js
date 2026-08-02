// VOLA — shared data & helpers (Paraguay domestic charter logic)

import { haversineKm } from './geo';

export const WHATSAPP_NUMBER = '595985606780';

// Fondo del Hero. Idealmente: cabina interior de jet ejecutivo (cuero claro,
// ventanas ovales). Se muestra a opacidad completa con overlay oscuro encima.
export const HERO_IMAGE =
  'https://images.pexels.com/photos/28919311/pexels-photo-28919311.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2';

/**
 * Aeropuertos operados por VOLA.
 * Fuente única de verdad: alimenta el autocompletado del cotizador,
 * el radar de flota (lat/lng) y el radar de clima aeronáutico.
 */
export const AIRPORTS = [
  { code: 'SGAS', city: 'Asunción', name: 'Silvio Pettirossi', lat: -25.24, lng: -57.52, hub: true },
  { code: 'SGES', city: 'Ciudad del Este', name: 'Guaraní', lat: -25.455, lng: -54.842 },
  { code: 'SGEN', city: 'Encarnación', name: 'Teniente Amin Ayub', lat: -27.228, lng: -55.837 },
  { code: 'SGPJ', city: 'Pedro Juan Caballero', name: 'Dr. Augusto R. Fuster', lat: -22.64, lng: -55.83 },
  { code: 'SGFI', city: 'Filadelfia', name: 'Chaco Central', lat: -22.343, lng: -60.028 },
  { code: 'SGCO', city: 'Concepción', name: 'Mcal. López', lat: -23.442, lng: -57.427 },
  { code: 'SGPI', city: 'Pilar', name: 'Carlos Miguel Jiménez', lat: -26.881, lng: -58.317 },
  { code: 'SGST', city: 'Salto del Guairá', name: 'Salto del Guairá', lat: -24.033, lng: -54.311 },
];

/** Etiqueta legible de un aeropuerto: "Asunción (SGAS - Silvio Pettirossi)" */
export function airportLabel(airport) {
  return `${airport.city} (${airport.code} - ${airport.name})`;
}

/** Busca un aeropuerto por código OACI. */
export function findAirport(code) {
  return AIRPORTS.find((a) => a.code === code);
}

export const ORIGIN = airportLabel(AIRPORTS[0]);

/** Derivado de AIRPORTS para no duplicar la lista de destinos. */
export const DESTINATIONS = AIRPORTS.slice(1).map(airportLabel);

export const FLEET = [
  {
    id: 'king-air',
    category: 'Turbohélice',
    name: 'Beechcraft King Air B200',
    image:
      'https://images.pexels.com/photos/17249810/pexels-photo-17249810.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
    blurb: 'Versátil y confiable, ideal para pistas cortas y vuelos domésticos a cualquier punto del país.',
    specs: [
      { label: 'Alcance', value: '2,200 km' },
      { label: 'Pasajeros', value: 'Hasta 9' },
      { label: 'Velocidad', value: '470 km/h' },
    ],
  },
  {
    id: 'citation',
    category: 'Jet Ejecutivo',
    name: 'Cessna Citation CJ3',
    image:
      'https://images.pexels.com/photos/18389297/pexels-photo-18389297.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
    blurb: 'Jet ligero presurizado para vuelos regionales rápidos y discretos a nivel ejecutivo.',
    specs: [
      { label: 'Alcance', value: '3,472 km' },
      { label: 'Pasajeros', value: 'Hasta 9' },
      { label: 'Velocidad', value: '770 km/h' },
    ],
  },
  {
    id: 'h125',
    category: 'Helicóptero',
    name: 'Airbus H125',
    image:
      'https://images.pexels.com/photos/38248383/pexels-photo-38248383.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
    blurb: 'Helicóptero monomotor de alto rendimiento para accesos directos, traslados y eventos VIP.',
    specs: [
      { label: 'Alcance', value: '650 km' },
      { label: 'Pasajeros', value: 'Hasta 6' },
      { label: 'Velocidad', value: '287 km/h' },
    ],
  },
];

export const EXPERIENCES = [
  {
    id: 'romantic',
    icon: 'Heart',
    title: 'Propuestas de Matrimonio & Sobrevuelos Románticos',
    desc: 'Sorprende a tu pareja con un sobrevuelo al atardecer sobre Asunción o San Bernardino con brindis de champagne a bordo.',
    image:
      'https://images.pexels.com/photos/1702985/pexels-photo-1702985.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
    tag: 'Atardecer',
  },
  {
    id: 'pilot',
    icon: 'Gamepad2',
    title: 'Piloto por un Día (45 min)',
    desc: 'Vive la adrenalina de tomar los mandos de una aeronave bajo la supervisión de un capitán certificado. Briefing en tierra + 45 min de vuelo real.',
    image:
      'https://images.pexels.com/photos/4269510/pexels-photo-4269510.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
    tag: '45 min',
  },
  {
    id: 'estancias',
    icon: 'Trees',
    title: 'Escapadas a Estancias & Chaco',
    desc: 'Traslados directos en helicóptero o avión a las mejores estancias turísticas del país sin perder horas en ruta.',
    image:
      'https://images.pexels.com/photos/4277458/pexels-photo-4277458.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
    tag: 'Traslado',
  },
  {
    id: 'events',
    icon: 'Sparkles',
    title: 'Helicóptero VIP para Eventos',
    desc: 'Llegadas de alto impacto para bodas, conciertos o cumbres corporativas con aterrizaje en helipuerto o propiedad privada.',
    image:
      'https://images.pexels.com/photos/36590635/pexels-photo-36590635.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
    tag: 'Eventos',
  },
];

export const EMPTY_LEGS = [
  {
    id: 1,
    from: 'Asunción',
    to: 'Punta del Este',
    date: '12 Ago',
    aircraft: 'Citation CJ3',
    seats: 6,
    price: 2100,
    discount: 35,
  },
  {
    id: 2,
    from: 'Asunción',
    to: 'São Paulo',
    date: '15 Ago',
    aircraft: 'Citation CJ3',
    seats: 4,
    price: 1650,
    discount: 40,
  },
  {
    id: 3,
    from: 'Buenos Aires',
    to: 'Asunción',
    date: '18 Ago',
    aircraft: 'King Air B200',
    seats: 7,
    price: 1450,
    discount: 28,
  },
  {
    id: 4,
    from: 'Encarnación',
    to: 'Ciudad del Este',
    date: '21 Ago',
    aircraft: 'Airbus H125',
    seats: 5,
    price: 890,
    discount: 45,
  },
];

/* ------------------------------------------------------------------ *
 * NAVEGACIÓN
 * Estructura declarativa que renderizan Navbar y Footer.
 * ------------------------------------------------------------------ */

export const SOON = 'Próximamente';

export const NAV_MENU = [
  {
    label: 'Productos',
    items: [
      { label: 'Taxi aéreo', path: '/taxi-aereo' },
      { label: 'Vuelos panorámicos', path: '/vuelos-panoramicos' },
      { label: 'Vuelos compartidos', path: '/vuelos-compartidos', badge: SOON },
      { label: 'Empty legs', path: '/empty-legs', badge: SOON },
      { label: 'Experiencias exclusivas', path: '/experiencias-exclusivas' },
      { label: 'Adquisición de aeronaves', path: '/adquisicion-aeronaves', badge: SOON },
    ],
  },
  {
    label: 'Empresa',
    items: [
      { label: 'Sobre nosotros', path: '/sobre-nosotros' },
      { label: 'App', path: '/app', badge: SOON },
      { label: 'Seguridad', path: '/seguridad' },
      { label: 'Política de privacidad', path: '/politica-privacidad' },
    ],
  },
];

export const NAV_DIRECT = [
  { label: 'Membresía VOLA', path: '/membresia', badge: SOON },
  { label: 'Contacto', path: '/contacto' },
];

/* ------------------------------------------------------------------ *
 * DATOS DE DEMOSTRACIÓN
 *
 * ⚠️  ATENCIÓN — NO PUBLICAR TAL CUAL.
 * VOLA no tiene (todavía) un perfil verificado en Trustpilot. Mostrar
 * esta calificación en producción sería exhibir reseñas inventadas bajo
 * una marca de terceros frente a clientes reales.
 *
 * Antes de salir a producción: reemplazar por la calificación real y su
 * enlace al perfil, o eliminar el bloque y usar <TrustBadge variant="own" />,
 * que muestra indicadores propios y verificables.
 * ------------------------------------------------------------------ */
export const DEMO_DATA = {
  enabled: true, // ← poner en false para ocultar el badge de Trustpilot
  trustpilot: { score: 4.8, stars: 5, reviews: 212, profileUrl: null },
};

/** Prueba social propia y verificable (no depende de terceros). */
export const TRUST_POINTS = [
  'Operadores certificados DINAC',
  'Concierge dedicado 24/7',
  'Tripulaciones con habilitación vigente',
];

/* ------------------------------------------------------------------ *
 * RADAR DE FLOTA (simulación)
 * `progress` sitúa a las aeronaves en vuelo entre origen y destino.
 * ------------------------------------------------------------------ */

export const FLEET_STATUS = [
  { id: 'ZP-VLA', model: 'Cessna Citation CJ3', type: 'Jet Ejecutivo', status: 'En vuelo', from: 'SGAS', to: 'SGES', progress: 0.42, altitude: '31.000 ft', speed: '742 km/h' },
  { id: 'ZP-VLB', model: 'Beechcraft King Air B200', type: 'Turbohélice', status: 'En vuelo', from: 'SGEN', to: 'SGAS', progress: 0.68, altitude: '18.500 ft', speed: '455 km/h' },
  { id: 'ZP-VLC', model: 'Airbus H125', type: 'Helicóptero', status: 'En tierra', at: 'SGAS', altitude: '—', speed: '—' },
  { id: 'ZP-VLD', model: 'Cessna Citation CJ3', type: 'Jet Ejecutivo', status: 'En hangar', at: 'SGAS', altitude: '—', speed: '—' },
  { id: 'ZP-VLE', model: 'Airbus H125', type: 'Helicóptero', status: 'En tierra', at: 'SGCO', altitude: '—', speed: '—' },
  { id: 'ZP-VLF', model: 'Beechcraft King Air B200', type: 'Turbohélice', status: 'En hangar', at: 'SGFI', altitude: '—', speed: '—' },
];

export const FLEET_STATUS_STYLES = {
  'En vuelo': { dot: '#16A34A', ring: 'rgba(22,163,74,0.18)', label: 'En vuelo' },
  'En tierra': { dot: '#C9A961', ring: 'rgba(201,169,97,0.18)', label: 'En tierra' },
  'En hangar': { dot: '#94A3B8', ring: 'rgba(148,163,184,0.18)', label: 'En hangar' },
};

/* ------------------------------------------------------------------ *
 * CLIMA AERONÁUTICO (datos de referencia)
 *
 * Lecturas de ejemplo con formato METAR real. Para conectar datos en
 * vivo basta reemplazar `getWeather()` por una llamada a la API de
 * aviationweather.gov manteniendo la misma forma de objeto.
 * ------------------------------------------------------------------ */

export const WEATHER_STATIONS = [
  { code: 'SGAS', category: 'VFR', tempC: 29, dewC: 19, windDeg: 130, windKt: 8, visibilityKm: 10, clouds: 'FEW 3.000 ft', precip: 'Sin precipitación', qnh: 1013,
    metar: 'SGAS 021500Z 13008KT 9999 FEW030 29/19 Q1013',
    taf: 'TAF SGAS 021400Z 0215/0315 13010KT 9999 SCT030' },
  { code: 'SGES', category: 'MVFR', tempC: 27, dewC: 22, windDeg: 90, windKt: 12, visibilityKm: 7, clouds: 'BKN 1.800 ft', precip: 'Llovizna ligera', qnh: 1011,
    metar: 'SGES 021500Z 09012KT 7000 -DZ BKN018 27/22 Q1011',
    taf: 'TAF SGES 021400Z 0215/0315 09012KT 6000 -RA BKN015' },
  { code: 'SGEN', category: 'VFR', tempC: 26, dewC: 17, windDeg: 160, windKt: 10, visibilityKm: 10, clouds: 'SCT 4.000 ft', precip: 'Sin precipitación', qnh: 1014,
    metar: 'SGEN 021500Z 16010KT 9999 SCT040 26/17 Q1014',
    taf: 'TAF SGEN 021400Z 0215/0315 16008KT 9999 SCT040' },
  { code: 'SGPJ', category: 'VFR', tempC: 31, dewC: 18, windDeg: 60, windKt: 6, visibilityKm: 10, clouds: 'Despejado', precip: 'Sin precipitación', qnh: 1012,
    metar: 'SGPJ 021500Z 06006KT 9999 SKC 31/18 Q1012',
    taf: 'TAF SGPJ 021400Z 0215/0315 06006KT 9999 SKC' },
  { code: 'SGFI', category: 'IFR', tempC: 33, dewC: 24, windDeg: 340, windKt: 18, visibilityKm: 3, clouds: 'OVC 900 ft', precip: 'Tormenta en las cercanías', qnh: 1008,
    metar: 'SGFI 021500Z 34018G28KT 3000 TS OVC009 33/24 Q1008',
    taf: 'TAF SGFI 021400Z 0215/0315 34018G30KT 3000 TSRA OVC009' },
  { code: 'SGCO', category: 'VFR', tempC: 30, dewC: 20, windDeg: 110, windKt: 7, visibilityKm: 10, clouds: 'FEW 3.500 ft', precip: 'Sin precipitación', qnh: 1012,
    metar: 'SGCO 021500Z 11007KT 9999 FEW035 30/20 Q1012',
    taf: 'TAF SGCO 021400Z 0215/0315 11007KT 9999 FEW035' },
];

export const WEATHER_CATEGORIES = {
  VFR: { color: '#16A34A', label: 'VFR', desc: 'Condiciones visuales' },
  MVFR: { color: '#C9A961', label: 'MVFR', desc: 'Visuales marginales' },
  IFR: { color: '#DC2626', label: 'IFR', desc: 'Vuelo instrumental' },
};

/**
 * Punto único de lectura del clima. Hoy sirve WEATHER_STATIONS;
 * para datos en vivo, reemplazar el cuerpo por un fetch a
 * https://aviationweather.gov/api/data/metar respetando la misma forma.
 */
export function getWeather() {
  return WEATHER_STATIONS.map((s) => ({ ...s, airport: findAirport(s.code) }));
}

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Estimación referencial de tarifa charter, en USD.
 *
 * Se calcula sobre la distancia real entre aeropuertos para que la misma
 * ruta devuelva siempre el mismo número. Es una referencia comercial, no
 * una tarifa en firme: el precio final lo confirma el concierge.
 */
export function estimatePrice({ from, to, passengers = 1, roundTrip = false }) {
  if (!from || !to || from.code === to.code) return null;

  const km = haversineKm(from, to);
  const BASE_USD = 850; // posicionamiento, handling y tasas
  const PER_KM_USD = 2.35;
  const legs = roundTrip ? 2 : 1;
  const paxSurcharge = 1 + Math.max(0, passengers - 4) * 0.06;

  const raw = (BASE_USD + km * PER_KM_USD) * legs * paxSurcharge;
  return Math.round(raw / 50) * 50; // redondeo comercial
}

/** Formatea una fecha ISO (yyyy-mm-dd) a texto largo en es-PY. */
export function formatDate(date) {
  if (!date) return 'A confirmar';
  return new Date(date + 'T00:00:00').toLocaleDateString('es-PY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatQuoteMessage({
  origin,
  destination,
  date,
  returnDate,
  passengers,
  price,
  roundTrip = false,
}) {
  return [
    '*VOLA — Solicitud de Vuelo Charter*',
    '',
    `*Tipo:* ${roundTrip ? 'Ida y vuelta' : 'Solo ida'}`,
    `*Origen:* ${origin}`,
    `*Destino:* ${destination}`,
    `*Fecha de ida:* ${formatDate(date)}`,
    ...(roundTrip ? [`*Fecha de vuelta:* ${formatDate(returnDate)}`] : []),
    `*Pasajeros:* ${passengers}`,
    `*Tarifa Estimada:* $${price.toLocaleString('en-US')} USD`,
    '',
    'Solicito confirmación y coordinación con el equipo de concierge.',
  ].join('\n');
}

export function formatEmptyLegMessage({ from, to, date, aircraft, seats, price }) {
  return [
    '*VOLA — Empty Leg*',
    '',
    `*Ruta:* ${from} → ${to}`,
    `*Fecha:* ${date}`,
    `*Aeronave:* ${aircraft}`,
    `*Asientos:* ${seats}`,
    `*Tarifa:* $${price.toLocaleString('en-US')} USD`,
    '',
    'Deseo reservar este vuelo de oportunidad.',
  ].join('\n');
}

export function formatExperienceMessage({ title, tag }) {
  return [
    '*VOLA — Experiencia VIP*',
    '',
    `*Experiencia:* ${title}`,
    `*Tipo:* ${tag}`,
    '',
    'Me interesa esta experiencia. Quiero más información y disponibilidad.',
  ].join('\n');
}

export function formatContactMessage({ name, email, phone, subject, message }) {
  return [
    '*VOLA — Consulta desde el sitio*',
    '',
    `*Nombre:* ${name || '—'}`,
    `*Email:* ${email || '—'}`,
    `*Teléfono:* ${phone || '—'}`,
    `*Asunto:* ${subject || 'Consulta general'}`,
    '',
    message || 'Sin mensaje adicional.',
  ].join('\n');
}

export function formatWaitlistMessage({ product, name, email }) {
  return [
    '*VOLA — Lista de espera*',
    '',
    `*Producto:* ${product}`,
    `*Nombre:* ${name || '—'}`,
    `*Email:* ${email || '—'}`,
    '',
    'Quiero que me avisen cuando esté disponible.',
  ].join('\n');
}

export function formatTourMessage({ title, duration, price }) {
  return [
    '*VOLA — Vuelo Panorámico*',
    '',
    `*Tour:* ${title}`,
    `*Duración:* ${duration}`,
    `*Tarifa de referencia:* $${price.toLocaleString('en-US')} USD`,
    '',
    'Quiero consultar disponibilidad para este vuelo panorámico.',
  ].join('\n');
}

export function formatFleetMessage({ name, category }) {
  return [
    '*VOLA — Consulta de Aeronave*',
    '',
    `*Aeronave:* ${name}`,
    `*Categoría:* ${category}`,
    '',
    'Quiero consultar disponibilidad y tarifas para esta aeronave.',
  ].join('\n');
}

/* ------------------------------------------------------------------ *
 * VUELOS PANORÁMICOS
 * ------------------------------------------------------------------ */

export const PANORAMIC_TOURS = [
  {
    id: 'asuncion',
    title: 'Asunción Skyline',
    duration: '20 min',
    price: 390,
    passengers: 'Hasta 3 pasajeros',
    aircraft: 'Airbus H125',
    desc: 'Sobrevuelo de la Bahía de Asunción, el Palacio de López, la Costanera y el centro histórico.',
    highlights: ['Bahía de Asunción', 'Palacio de López', 'Costanera', 'Centro histórico'],
    image: 'https://images.pexels.com/photos/38248383/pexels-photo-38248383.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
  },
  {
    id: 'san-bernardino',
    title: 'San Bernardino & Lago Ypacaraí',
    duration: '35 min',
    price: 640,
    passengers: 'Hasta 5 pasajeros',
    aircraft: 'Airbus H125',
    desc: 'Vuelo sobre el Lago Ypacaraí y la costa de San Bernardino, con opción de aterrizaje en propiedad privada.',
    highlights: ['Lago Ypacaraí', 'Costa de San Ber', 'Aregua', 'Cordillera de los Altos'],
    image: 'https://images.pexels.com/photos/1702985/pexels-photo-1702985.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
  },
  {
    id: 'rio-paraguay',
    title: 'Río Paraguay & Chaco',
    duration: '45 min',
    price: 820,
    passengers: 'Hasta 5 pasajeros',
    aircraft: 'Airbus H125',
    desc: 'Recorrido sobre el curso del Río Paraguay y el borde del Chaco, con sus humedales y estancias.',
    highlights: ['Río Paraguay', 'Humedales', 'Estancias del Chaco', 'Confluencia'],
    image: 'https://images.pexels.com/photos/4277458/pexels-photo-4277458.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
  },
];
