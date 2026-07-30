// VOLA — shared data & helpers

export const WHATSAPP_NUMBER = '595985606780';

export const HERO_IMAGE =
  'https://images.pexels.com/photos/28919311/pexels-photo-28919311.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2';

export const ORIGIN_OPTIONS = [
  'Asunción (SGAS)',
  'Ciudad del Este (SGES)',
  'Encarnación (SGEN)',
  'Punta del Este (SULS)',
  'Buenos Aires (SAEZ)',
  'São Paulo (SBSP)',
];

export const FLEET = [
  {
    id: 'light',
    category: 'Light Jets',
    name: 'Citation CJ3+',
    image:
      'https://images.pexels.com/photos/18389297/pexels-photo-18389297.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
    blurb: 'Ágil y eficiente para vuelos regionales de corto alcance.',
    specs: [
      { label: 'Autonomía', value: '3,472 km' },
      { label: 'Pasajeros', value: 'Hasta 9' },
      { label: 'Velocidad', value: '770 km/h' },
    ],
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'mid',
    category: 'Midsize Jets',
    name: 'Legacy 500',
    image:
      'https://images.pexels.com/photos/27256372/pexels-photo-27256372.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
    blurb: 'Cabina amplia, alcance intercontinental y confort de clase ejecutiva.',
    specs: [
      { label: 'Autonomía', value: '5,788 km' },
      { label: 'Pasajeros', value: 'Hasta 12' },
      { label: 'Velocidad', value: '850 km/h' },
    ],
    span: 'md:col-span-2 md:row-span-1',
  },
  {
    id: 'heli',
    category: 'Helicópteros',
    name: 'Airbus H145',
    image:
      'https://images.pexels.com/photos/38248383/pexels-photo-38248383.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
    blurb: 'Acceso directo a destinos exclusivos y traslados urbanos VIP.',
    specs: [
      { label: 'Autonomía', value: '680 km' },
      { label: 'Pasajeros', value: 'Hasta 8' },
      { label: 'Velocidad', value: '268 km/h' },
    ],
    span: 'md:col-span-1 md:row-span-2',
  },
  {
    id: 'heavy',
    category: 'Heavy Jets',
    name: 'Gulfstream G650',
    image:
      'https://images.pexels.com/photos/16242739/pexels-photo-16242739.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
    blurb: 'El pináculo del lujo aéreo. Cabina silenciosa y alcance intercontinental.',
    specs: [
      { label: 'Autonomía', value: '12,964 km' },
      { label: 'Pasajeros', value: 'Hasta 19' },
      { label: 'Velocidad', value: '956 km/h' },
    ],
    span: 'md:col-span-2 md:row-span-1',
  },
];

export const EMPTY_LEGS = [
  {
    id: 1,
    from: 'Asunción',
    to: 'Punta del Este',
    date: '12 Ago',
    aircraft: 'Legacy 500',
    seats: 6,
    price: 4200,
    discount: 35,
  },
  {
    id: 2,
    from: 'Asunción',
    to: 'São Paulo',
    date: '15 Ago',
    aircraft: 'Citation CJ3+',
    seats: 4,
    price: 3100,
    discount: 40,
  },
  {
    id: 3,
    from: 'Buenos Aires',
    to: 'Asunción',
    date: '18 Ago',
    aircraft: 'Gulfstream G650',
    seats: 9,
    price: 8900,
    discount: 28,
  },
  {
    id: 4,
    from: 'Encarnación',
    to: 'Ciudad del Este',
    date: '21 Ago',
    aircraft: 'Airbus H145',
    seats: 5,
    price: 1850,
    discount: 45,
  },
];

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatQuoteMessage({ origin, destination, date, passengers, price }) {
  const dateStr = date ? new Date(date + 'T00:00:00').toLocaleDateString('es-PY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }) : 'A confirmar';

  return [
    '*VOLA — Solicitud de Vuelo Privado*',
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
