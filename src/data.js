// VOLA — shared data & helpers (Paraguay domestic charter logic)

import { haversineKm } from './geo';

export const WHATSAPP_NUMBER = '595985606780';

/**
 * Isotipo de marca (las dos alas con la bandera).
 *
 * Pendiente: el diseñador debe entregar el vectorial. Cuando esté, dejarlo
 * en `public/` y apuntar acá — por ejemplo '/logo-vola.svg'. El componente
 * Logo lo muestra automáticamente junto al wordmark en navbar y footer.
 *
 * Se mantiene en null a propósito: reconstruir el isotipo a mano desde los
 * mockups en JPEG daría una versión parecida pero distinta de la identidad
 * real, y eso es peor que mostrar sólo el logotipo tipográfico.
 */
export const BRAND_MARK_SRC = null;

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
  { code: 'SGAS', city: 'Asunción', name: 'Silvio Pettirossi', lat: -25.24, lng: -57.52, hub: true, base: true },
  { code: 'SGES', city: 'Ciudad del Este', name: 'Guaraní', lat: -25.455, lng: -54.842, base: true },
  { code: 'SGEN', city: 'Encarnación', name: 'Teniente Amin Ayub', lat: -27.228, lng: -55.837, base: true },
  { code: 'SGFI', city: 'Filadelfia', name: 'Chaco Central', lat: -22.343, lng: -60.028, base: true },
  { code: 'SGPJ', city: 'Pedro Juan Caballero', name: 'Dr. Augusto R. Fuster', lat: -22.64, lng: -55.83 },
  { code: 'SGCO', city: 'Concepción', name: 'Mcal. López', lat: -23.442, lng: -57.427 },
  { code: 'SGPI', city: 'Pilar', name: 'Carlos Miguel Jiménez', lat: -26.881, lng: -58.317 },
  { code: 'SGST', city: 'Salto del Guairá', name: 'Salto del Guairá', lat: -24.033, lng: -54.311 },
];

/** Bases operativas: las únicas que se marcan en el radar de flota. */
export const BASES = AIRPORTS.filter((a) => a.base);

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

/* ------------------------------------------------------------------ *
 * RUTAS FRECUENTES
 *
 * Reemplaza al listado de empty legs, que publicaba vuelos con fechas y
 * precios concretos que no existían. Esto es información verdadera:
 * conexiones reales con tiempos de vuelo y tipo de aeronave.
 * ------------------------------------------------------------------ */

export const FREQUENT_ROUTES = [
  {
    id: 'asu-fil',
    from: 'SGAS',
    to: 'SGFI',
    duration: '~1h 10m',
    aircraft: 'Turboprop',
    blurb: 'Conexión directa con el polo agroindustrial.',
    image:
      'https://images.pexels.com/photos/17249810/pexels-photo-17249810.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
  },
  {
    id: 'asu-cde',
    from: 'SGAS',
    to: 'SGES',
    duration: '~45m',
    aircraft: 'Twin Engine / Jet',
    blurb: 'Viajes de negocios exprés al Este.',
    image:
      'https://images.pexels.com/photos/18389297/pexels-photo-18389297.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
  },
  {
    id: 'asu-enc',
    from: 'SGAS',
    to: 'SGEN',
    duration: '~50m',
    aircraft: 'Light Aircraft',
    blurb: 'Turismo y reuniones ejecutivas en el Sur.',
    image:
      'https://images.pexels.com/photos/4277458/pexels-photo-4277458.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
  },
];

/* ------------------------------------------------------------------ *
 * NAVEGACIÓN
 * Estructura declarativa que renderizan Navbar y Footer.
 * ------------------------------------------------------------------ */

export const SOON = 'Próximamente';

/**
 * Los ítems llevan clave de traducción en vez de etiqueta literal: Navbar y
 * Footer las resuelven con t(), de modo que la navegación sigue teniendo
 * una sola fuente en los cuatro idiomas.
 */
export const NAV_MENU = [
  {
    key: 'nav.products',
    items: [
      { key: 'nav.taxiAereo', path: '/taxi-aereo' },
      { key: 'nav.panoramic', path: '/vuelos-panoramicos' },
      { key: 'nav.shared', path: '/vuelos-compartidos', soon: true },
      { key: 'nav.emptyLegs', path: '/empty-legs', soon: true },
      { key: 'nav.experiences', path: '/experiencias-exclusivas' },
      { key: 'nav.acquisition', path: '/adquisicion-aeronaves', soon: true },
    ],
  },
  {
    key: 'nav.company',
    items: [
      { key: 'nav.about', path: '/sobre-nosotros' },
      { key: 'nav.app', path: '/app', soon: true },
      { key: 'nav.safety', path: '/seguridad' },
      { key: 'nav.privacy', path: '/politica-privacidad' },
    ],
  },
];

export const NAV_DIRECT = [
  { key: 'nav.membership', path: '/membresia', soon: true },
  { key: 'nav.community', path: '/comunidad' },
  { key: 'nav.contact', path: '/contacto' },
];

/* ------------------------------------------------------------------ *
 * PRUEBA SOCIAL DE TERCEROS (desactivada)
 *
 * `enabled: false` porque VOLA no tiene todavía un perfil verificado en
 * Trustpilot: publicar esa calificación sería exhibir reseñas inventadas
 * bajo una marca ajena frente a clientes reales. Con esto apagado,
 * TrustBadge cae a los indicadores propios de TRUST_POINTS.
 *
 * Para reactivarlo hace falta un perfil real: cargar el puntaje verdadero,
 * la cantidad de reseñas y `profileUrl` apuntando al perfil público, y
 * recién ahí poner `enabled: true`.
 * ------------------------------------------------------------------ */
export const DEMO_DATA = {
  enabled: false,
  trustpilot: { score: null, reviews: null, stars: 5, profileUrl: null },
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

/* ------------------------------------------------------------------ *
 * FLOTA POR BASE
 * Distribución estática: el radar no simula vuelos en curso.
 * ------------------------------------------------------------------ */

export const FLEET_STATUS = [
  { id: 'ZP-VLA', model: 'Cessna Citation CJ3', type: 'Jet Ejecutivo', at: 'SGAS', status: 'Disponible', seats: 9 },
  { id: 'ZP-VLB', model: 'Beechcraft King Air B200', type: 'Turbohélice', at: 'SGAS', status: 'Asignada', seats: 9 },
  { id: 'ZP-VLC', model: 'Airbus H125', type: 'Helicóptero', at: 'SGAS', status: 'Disponible', seats: 6 },
  { id: 'ZP-VLD', model: 'Cessna Citation CJ3', type: 'Jet Ejecutivo', at: 'SGES', status: 'Disponible', seats: 9 },
  { id: 'ZP-VLE', model: 'Airbus H125', type: 'Helicóptero', at: 'SGEN', status: 'Disponible', seats: 6 },
  { id: 'ZP-VLF', model: 'Beechcraft King Air B200', type: 'Turbohélice', at: 'SGFI', status: 'En mantenimiento', seats: 9 },
];

/**
 * Estos estados se pintan sobre el panel navy del radar, así que los colores
 * tienen que ser claros: el navy de marca sobre fondo navy es ilegible.
 * "Asignada" usa un azul aclarado de la familia de marca, distinguible del
 * gris de mantenimiento.
 */
export const FLEET_STATUS_STYLES = {
  Disponible: { dot: '#34D399', ring: 'rgba(52,211,153,0.16)' },
  Asignada: { dot: '#7FA9DC', ring: 'rgba(127,169,220,0.18)' },
  'En mantenimiento': { dot: '#94A3B8', ring: 'rgba(148,163,184,0.16)' },
};

/** Aeronaves estacionadas en una base. */
export function fleetAtBase(code) {
  return FLEET_STATUS.filter((c) => c.at === code);
}

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
  { code: 'SGFI', category: 'IFR', tempC: 33, dewC: 24, windDeg: 340, windKt: 18, visibilityKm: 3, clouds: 'OVC 900 ft', precip: 'Tormenta en las cercanías', qnh: 1008,
    metar: 'SGFI 021500Z 34018G28KT 3000 TS OVC009 33/24 Q1008',
    taf: 'TAF SGFI 021400Z 0215/0315 34018G30KT 3000 TSRA OVC009' },
];

/** Convención de color de las cartas aeronáuticas: VFR verde, MVFR azul, IFR rojo. */
export const WEATHER_CATEGORIES = {
  VFR: { color: '#16A34A', label: 'VFR', desc: 'Condiciones visuales' },
  MVFR: { color: '#2563EB', label: 'MVFR', desc: 'Visuales marginales' },
  IFR: { color: '#DC2626', label: 'IFR', desc: 'Vuelo instrumental' },
};

/* ------------------------------------------------------------------ *
 * MAPA METEOROLÓGICO EN VIVO (Windy)
 * ------------------------------------------------------------------ */

export const WEATHER_LAYERS = [
  { id: 'wind', key: 'weather.layerWind' },
  { id: 'clouds', key: 'weather.layerClouds' },
  { id: 'rain', key: 'weather.layerRain' },
];

/** Centro del encuadre: Paraguay completo, con algo de contexto regional. */
const WINDY_CENTER = { lat: -23.4, lon: -58.4, zoom: 5 };

export function buildWindyUrl(overlay = 'wind') {
  const p = new URLSearchParams({
    lat: WINDY_CENTER.lat,
    lon: WINDY_CENTER.lon,
    zoom: WINDY_CENTER.zoom,
    level: 'surface',
    overlay,
    product: 'ecmwf',
    menu: '',
    message: '',
    marker: '',
    calendar: 'now',
    pressure: '',
    type: 'map',
    location: 'coordinates',
    detail: '',
    metricWind: 'kt',
    metricTemp: '°C',
    radarRange: '-1',
  });
  return `https://embed.windy.com/embed2.html?${p}`;
}

export const WINDY_FULL_URL = `https://www.windy.com/?${WINDY_CENTER.lat},${WINDY_CENTER.lon},${WINDY_CENTER.zoom}`;

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

export function formatRouteMessage({ from, to, duration, aircraft }) {
  return [
    '*VOLA — Ruta Frecuente*',
    '',
    `*Ruta:* ${airportLabel(from)} → ${airportLabel(to)}`,
    `*Tiempo estimado:* ${duration}`,
    `*Aeronave sugerida:* ${aircraft}`,
    '',
    'Quiero cotizar esta ruta.',
  ].join('\n');
}

export function formatPilotMessage({ name, phone, hours, license }) {
  return [
    '*VOLA — Pre-registro Comunidad de Pilotos*',
    '',
    `*Nombre:* ${name || '—'}`,
    `*Teléfono:* ${phone || '—'}`,
    `*Horas de vuelo:* ${hours || '—'}`,
    `*Tipo de licencia:* ${license || '—'}`,
    '',
    'Quiero sumarme a la comunidad de pilotos de VOLA.',
  ].join('\n');
}

/** Licencias de piloto reconocidas. Se pide el tipo, nunca el número. */
export const LICENSE_TYPES = [
  'PPL — Piloto Privado',
  'CPL — Piloto Comercial',
  'ATPL — Piloto de Transporte de Línea Aérea',
  'Piloto de Helicóptero',
  'En formación',
];

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
