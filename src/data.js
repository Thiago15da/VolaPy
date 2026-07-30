// VOLA — shared data & helpers (Paraguay domestic charter logic)

export const WHATSAPP_NUMBER = '595985606780';

export const HERO_IMAGE =
  'https://images.pexels.com/photos/28919311/pexels-photo-28919311.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2';

export const ORIGIN = 'Asunción (SGAS - Silvio Pettirossi)';

export const DESTINATIONS = [
  'Ciudad del Este (SGES - Guaraní)',
  'Encarnación (SGEN - Teniente Amin Ayub)',
  'Pedro Juan Caballero (SGPJ - Dr. Fuster)',
  'Filadelfia / Chaco (SGFI)',
  'Concepción (SGCO - Mcal. López)',
  'Pilar (SGPI - Carlos Miguel Jiménez)',
  'Salto del Guairá (SGST)',
];

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

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatQuoteMessage({ origin, destination, date, passengers, price }) {
  const dateStr = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('es-PY', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'A confirmar';

  return [
    '*VOLA — Solicitud de Vuelo Charter*',
    '',
    `*Origen:* ${origin}`,
    `*Destino:* ${destination}`,
    `*Fecha:* ${dateStr}`,
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
