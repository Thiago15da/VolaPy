/**
 * Diccionario de traducción liviano.
 *
 * Alcance: toda la interfaz (navegación, hero, cotizador, formularios,
 * botones, títulos de sección). Los cuerpos largos —política de privacidad,
 * seguridad, sobre nosotros— permanecen en español: traducir a máquina
 * material legal y de seguridad aeronáutica sería irresponsable.
 *
 * El español es la base y también el fallback: si falta una clave en otro
 * idioma se devuelve la española, nunca la clave cruda.
 */

export const LANGUAGES = [
  { code: 'es', label: 'Español', short: 'ES', flag: '🇪🇸' },
  { code: 'en', label: 'English', short: 'EN', flag: '🇬🇧' },
  { code: 'pt', label: 'Português', short: 'PT', flag: '🇧🇷' },
  { code: 'de', label: 'Deutsch', short: 'DE', flag: '🇩🇪' },
];

export const DEFAULT_LANG = 'es';

/** Moneda única de cotización. Las tarifas charter se pactan en dólares. */
export const CURRENCY = 'USD';

const es = {
  'common.currencyNote': 'Todas las tarifas se cotizan en dólares estadounidenses',
  'common.language': 'Idioma',
  'common.soon': 'Próximamente',
  'common.close': 'Cerrar',
  'common.name': 'Nombre',
  'common.email': 'Email',
  'common.phone': 'Teléfono',
  'common.send': 'Enviar',
  'common.notice': 'Esta sección está disponible en español.',

  'nav.products': 'Productos',
  'nav.company': 'Empresa',
  'nav.taxiAereo': 'Taxi aéreo',
  'nav.panoramic': 'Vuelos panorámicos',
  'nav.shared': 'Vuelos compartidos',
  'nav.emptyLegs': 'Empty legs',
  'nav.experiences': 'Experiencias exclusivas',
  'nav.acquisition': 'Adquisición de aeronaves',
  'nav.about': 'Sobre nosotros',
  'nav.app': 'App',
  'nav.safety': 'Seguridad',
  'nav.privacy': 'Política de privacidad',
  'nav.membership': 'Membresía VOLA',
  'nav.community': 'Comunidad de Pilotos',
  'nav.contact': 'Contacto',
  'nav.concierge': 'Contactar Concierge',
  'nav.openMenu': 'Abrir menú',
  'nav.more': 'Más',

  'hero.title': 'La plataforma líder en jets y vuelos privados en Paraguay',
  'hero.subtitle':
    'Charter doméstico y helicópteros bajo demanda. Cotizá tu ruta en segundos y coordiná el vuelo con un concierge dedicado.',
  'hero.stat.concierge': 'Concierge dedicado',
  'hero.stat.airports': 'Aeropuertos operados',
  'hero.stat.response': 'Tiempo de respuesta',
  'hero.stat.privacy': 'Privacidad garantizada',

  'quoter.oneWay': 'Solo ida',
  'quoter.roundTrip': 'Viaje de ida y vuelta',
  'quoter.origin': 'Origen',
  'quoter.destination': 'Destino',
  'quoter.originPlaceholder': 'Ingrese el origen',
  'quoter.destinationPlaceholder': 'Ingrese el destino',
  'quoter.swap': 'Intercambiar origen y destino',
  'quoter.departDate': 'Fecha de ida',
  'quoter.returnDate': 'Fecha de vuelta',
  'quoter.passengers': 'Pasajeros',
  'quoter.passenger_one': 'pasajero',
  'quoter.passenger_other': 'pasajeros',
  'quoter.search': 'Buscar vuelo',
  'quoter.calculating': 'Calculando ruta óptima…',
  'quoter.estimate': 'Estimación referencial',
  'quoter.roundTripSuffix': '(ida y vuelta)',
  'quoter.confirm': 'Confirmar por WhatsApp',
  'quoter.newSearch': 'Nueva búsqueda',
  'quoter.disclaimer':
    'Estimación calculada sobre la distancia de la ruta. La tarifa final la confirma el concierge según aeronave, horario y disponibilidad.',
  'quoter.errorEmpty': 'Elegí origen y destino para cotizar.',
  'quoter.errorSame': 'El origen y el destino no pueden ser iguales.',
  'quoter.noResults': 'Sin resultados',

  'routes.eyebrow': 'Rutas frecuentes',
  'routes.title': 'Rutas Frecuentes & Destinos Populares en Paraguay',
  'routes.lead':
    'Las conexiones que más nos piden, con tiempos de vuelo reales y el tipo de aeronave que mejor se ajusta a cada tramo.',
  'routes.flightTime': 'Tiempo de vuelo',
  'routes.aircraft': 'Aeronave',
  'routes.quote': 'Cotizar esta ruta',

  'radar.eyebrow': 'Radar de flota',
  'radar.title': 'Nuestra flota, por base operativa',
  'radar.lead':
    'Distribución de las aeronaves de VOLA en las bases del país. Tocá una base para ver las unidades asignadas.',
  'radar.selectBase': 'Seleccioná una base en el mapa para ver sus aeronaves.',
  'radar.aircraft': 'Aeronaves en esta base',
  'radar.type': 'Tipo',
  'radar.status': 'Estado',
  'radar.disclaimer':
    'Distribución de referencia de la flota. No es un sistema de seguimiento ADS-B en vivo.',

  'weather.eyebrow': 'Clima aeronáutico',
  'weather.title': 'Condiciones en los aeropuertos del país',
  'weather.lead':
    'Mapa en vivo y lectura simplificada de METAR y TAF para planificación de vuelo.',
  'weather.layerWind': 'Viento',
  'weather.layerClouds': 'Nubes',
  'weather.layerRain': 'Lluvia',
  'weather.mapTitle': 'Mapa meteorológico en vivo de Paraguay',
  'weather.mapUnavailable': 'El mapa en vivo no está disponible',
  'weather.mapUnavailableDesc':
    'No pudimos cargar el mapa meteorológico externo. Abajo siguen las lecturas por estación.',
  'weather.openWindy': 'Abrir en Windy',
  'weather.wind': 'Viento',
  'weather.clouds': 'Nubosidad',
  'weather.precip': 'Precipitación',
  'weather.showRaw': 'Ver METAR / TAF',
  'weather.hideRaw': 'Ocultar reporte',
  'weather.disclaimer':
    'Datos de referencia con formato METAR/TAF real, provistos como demostración. No usar para planificación operativa: consultá siempre la fuente oficial de la DINAC antes de volar.',

  'community.eyebrow': 'Comunidad de Pilotos',
  'community.title': 'La red exclusiva para aviadores y capitanes ejecutivos en Paraguay',
  'community.lead':
    'Un espacio para conectar pilotos habilitados con operadores y vuelos disponibles. Estamos armando la primera generación de miembros fundadores.',
  'community.badgesTitle': 'Insignias de la comunidad',
  'community.badgesLead':
    'Distintivos que la plataforma otorgará a los miembros una vez validado su perfil.',
  'community.dashboardTitle': 'Así se va a ver la plataforma',
  'community.dashboardLead':
    'Vista conceptual del panel de pilotos en desarrollo. El diseño final puede variar.',
  'community.formTitle': 'Pre-registro de pilotos',
  'community.formLead':
    'Dejanos tus datos y te contactamos para sumarte a la primera generación.',
  'community.hours': 'Horas de vuelo',
  'community.license': 'Tipo de licencia',
  'community.submit': 'Solicitar acceso',
  'community.sent': 'Abrimos WhatsApp con tu solicitud',
  'community.sentDesc':
    'Si no se abrió automáticamente, escribinos y te sumamos a la lista de pilotos.',
  'community.another': 'Cargar otro piloto',
  'community.privacyNote':
    'No pedimos el número de licencia por este canal. La validación se hace más adelante, por vía formal.',

  'footer.tagline':
    'El nuevo estándar en aviación privada y helicópteros en Paraguay. Vuelos charter domésticos bajo demanda, con concierge dedicado 24/7.',
  'footer.conciergeEyebrow': 'Concierge',
  'footer.ctaTitle': '¿Listo para elevar',
  'footer.ctaTitle2': 'su próximo viaje?',
  'footer.ctaLead':
    'Nuestro equipo está disponible las 24 horas para diseñar la experiencia de vuelo perfecta.',
  'footer.contact': 'Contacto',
  'footer.rights': 'Todos los derechos reservados.',
};

const en = {
  'common.currencyNote': 'All fares are quoted in US dollars',
  'common.language': 'Language',
  'common.soon': 'Coming soon',
  'common.close': 'Close',
  'common.name': 'Name',
  'common.email': 'Email',
  'common.phone': 'Phone',
  'common.send': 'Send',
  'common.notice': 'This section is available in Spanish.',

  'nav.products': 'Products',
  'nav.company': 'Company',
  'nav.taxiAereo': 'Air taxi',
  'nav.panoramic': 'Scenic flights',
  'nav.shared': 'Shared flights',
  'nav.emptyLegs': 'Empty legs',
  'nav.experiences': 'Exclusive experiences',
  'nav.acquisition': 'Aircraft acquisition',
  'nav.about': 'About us',
  'nav.app': 'App',
  'nav.safety': 'Safety',
  'nav.privacy': 'Privacy policy',
  'nav.membership': 'VOLA Membership',
  'nav.community': 'Pilot Community',
  'nav.contact': 'Contact',
  'nav.concierge': 'Contact Concierge',
  'nav.openMenu': 'Open menu',
  'nav.more': 'More',

  'hero.title': 'The leading private jet and charter platform in Paraguay',
  'hero.subtitle':
    'Domestic charter and helicopters on demand. Quote your route in seconds and coordinate the flight with a dedicated concierge.',
  'hero.stat.concierge': 'Dedicated concierge',
  'hero.stat.airports': 'Airports served',
  'hero.stat.response': 'Response time',
  'hero.stat.privacy': 'Guaranteed privacy',

  'quoter.oneWay': 'One way',
  'quoter.roundTrip': 'Round trip',
  'quoter.origin': 'Origin',
  'quoter.destination': 'Destination',
  'quoter.originPlaceholder': 'Enter origin',
  'quoter.destinationPlaceholder': 'Enter destination',
  'quoter.swap': 'Swap origin and destination',
  'quoter.departDate': 'Departure date',
  'quoter.returnDate': 'Return date',
  'quoter.passengers': 'Passengers',
  'quoter.passenger_one': 'passenger',
  'quoter.passenger_other': 'passengers',
  'quoter.search': 'Search flight',
  'quoter.calculating': 'Calculating optimal route…',
  'quoter.estimate': 'Reference estimate',
  'quoter.roundTripSuffix': '(round trip)',
  'quoter.confirm': 'Confirm via WhatsApp',
  'quoter.newSearch': 'New search',
  'quoter.disclaimer':
    'Estimate based on route distance. The final fare is confirmed by the concierge according to aircraft, schedule and availability.',
  'quoter.errorEmpty': 'Choose an origin and destination to get a quote.',
  'quoter.errorSame': 'Origin and destination cannot be the same.',
  'quoter.noResults': 'No results',

  'routes.eyebrow': 'Frequent routes',
  'routes.title': 'Frequent Routes & Popular Destinations in Paraguay',
  'routes.lead':
    'The connections we are asked for most, with real flight times and the aircraft type best suited to each leg.',
  'routes.flightTime': 'Flight time',
  'routes.aircraft': 'Aircraft',
  'routes.quote': 'Quote this route',

  'radar.eyebrow': 'Fleet radar',
  'radar.title': 'Our fleet, by operating base',
  'radar.lead':
    'Distribution of the VOLA fleet across bases in the country. Tap a base to see the aircraft assigned to it.',
  'radar.selectBase': 'Select a base on the map to see its aircraft.',
  'radar.aircraft': 'Aircraft at this base',
  'radar.type': 'Type',
  'radar.status': 'Status',
  'radar.disclaimer':
    'Reference fleet distribution. This is not a live ADS-B tracking system.',

  'weather.eyebrow': 'Aviation weather',
  'weather.title': 'Conditions at airports across the country',
  'weather.lead': 'Live map and simplified METAR and TAF readings for flight planning.',
  'weather.layerWind': 'Wind',
  'weather.layerClouds': 'Clouds',
  'weather.layerRain': 'Rain',
  'weather.mapTitle': 'Live weather map of Paraguay',
  'weather.mapUnavailable': 'The live map is unavailable',
  'weather.mapUnavailableDesc':
    'We could not load the external weather map. Station readings are still available below.',
  'weather.openWindy': 'Open in Windy',
  'weather.wind': 'Wind',
  'weather.clouds': 'Cloud cover',
  'weather.precip': 'Precipitation',
  'weather.showRaw': 'View METAR / TAF',
  'weather.hideRaw': 'Hide report',
  'weather.disclaimer':
    'Reference data in real METAR/TAF format, provided as a demonstration. Do not use for operational planning: always check the official DINAC source before flying.',

  'community.eyebrow': 'Pilot Community',
  'community.title': 'The exclusive network for aviators and executive captains in Paraguay',
  'community.lead':
    'A space connecting licensed pilots with operators and available flights. We are assembling the first generation of founding members.',
  'community.badgesTitle': 'Community badges',
  'community.badgesLead':
    'Distinctions the platform will award to members once their profile is validated.',
  'community.dashboardTitle': 'How the platform will look',
  'community.dashboardLead':
    'Concept view of the pilot dashboard in development. The final design may vary.',
  'community.formTitle': 'Pilot pre-registration',
  'community.formLead': 'Leave your details and we will contact you to join the first generation.',
  'community.hours': 'Flight hours',
  'community.license': 'Licence type',
  'community.submit': 'Request access',
  'community.sent': 'We opened WhatsApp with your request',
  'community.sentDesc':
    'If it did not open automatically, message us and we will add you to the pilot list.',
  'community.another': 'Add another pilot',
  'community.privacyNote':
    'We do not ask for your licence number through this channel. Validation happens later, through formal means.',

  'footer.tagline':
    'The new standard in private aviation and helicopters in Paraguay. Domestic charter flights on demand, with a dedicated 24/7 concierge.',
  'footer.conciergeEyebrow': 'Concierge',
  'footer.ctaTitle': 'Ready to elevate',
  'footer.ctaTitle2': 'your next trip?',
  'footer.ctaLead':
    'Our team is available around the clock to design the perfect flight experience.',
  'footer.contact': 'Contact',
  'footer.rights': 'All rights reserved.',
};

const pt = {
  'common.currencyNote': 'Todas as tarifas são cotadas em dólares americanos',
  'common.language': 'Idioma',
  'common.soon': 'Em breve',
  'common.close': 'Fechar',
  'common.name': 'Nome',
  'common.email': 'Email',
  'common.phone': 'Telefone',
  'common.send': 'Enviar',
  'common.notice': 'Esta seção está disponível em espanhol.',

  'nav.products': 'Produtos',
  'nav.company': 'Empresa',
  'nav.taxiAereo': 'Táxi aéreo',
  'nav.panoramic': 'Voos panorâmicos',
  'nav.shared': 'Voos compartilhados',
  'nav.emptyLegs': 'Empty legs',
  'nav.experiences': 'Experiências exclusivas',
  'nav.acquisition': 'Aquisição de aeronaves',
  'nav.about': 'Sobre nós',
  'nav.app': 'App',
  'nav.safety': 'Segurança',
  'nav.privacy': 'Política de privacidade',
  'nav.membership': 'Membresia VOLA',
  'nav.community': 'Comunidade de Pilotos',
  'nav.contact': 'Contato',
  'nav.concierge': 'Falar com o Concierge',
  'nav.openMenu': 'Abrir menu',
  'nav.more': 'Mais',

  'hero.title': 'A plataforma líder em jatos e voos privados no Paraguai',
  'hero.subtitle':
    'Fretamento doméstico e helicópteros sob demanda. Cote sua rota em segundos e organize o voo com um concierge dedicado.',
  'hero.stat.concierge': 'Concierge dedicado',
  'hero.stat.airports': 'Aeroportos atendidos',
  'hero.stat.response': 'Tempo de resposta',
  'hero.stat.privacy': 'Privacidade garantida',

  'quoter.oneWay': 'Somente ida',
  'quoter.roundTrip': 'Ida e volta',
  'quoter.origin': 'Origem',
  'quoter.destination': 'Destino',
  'quoter.originPlaceholder': 'Informe a origem',
  'quoter.destinationPlaceholder': 'Informe o destino',
  'quoter.swap': 'Trocar origem e destino',
  'quoter.departDate': 'Data de ida',
  'quoter.returnDate': 'Data de volta',
  'quoter.passengers': 'Passageiros',
  'quoter.passenger_one': 'passageiro',
  'quoter.passenger_other': 'passageiros',
  'quoter.search': 'Buscar voo',
  'quoter.calculating': 'Calculando rota ideal…',
  'quoter.estimate': 'Estimativa de referência',
  'quoter.roundTripSuffix': '(ida e volta)',
  'quoter.confirm': 'Confirmar pelo WhatsApp',
  'quoter.newSearch': 'Nova busca',
  'quoter.disclaimer':
    'Estimativa calculada pela distância da rota. A tarifa final é confirmada pelo concierge conforme aeronave, horário e disponibilidade.',
  'quoter.errorEmpty': 'Escolha origem e destino para cotar.',
  'quoter.errorSame': 'Origem e destino não podem ser iguais.',
  'quoter.noResults': 'Sem resultados',

  'routes.eyebrow': 'Rotas frequentes',
  'routes.title': 'Rotas Frequentes & Destinos Populares no Paraguai',
  'routes.lead':
    'As conexões mais pedidas, com tempos de voo reais e o tipo de aeronave ideal para cada trecho.',
  'routes.flightTime': 'Tempo de voo',
  'routes.aircraft': 'Aeronave',
  'routes.quote': 'Cotar esta rota',

  'radar.eyebrow': 'Radar da frota',
  'radar.title': 'Nossa frota, por base operacional',
  'radar.lead':
    'Distribuição das aeronaves da VOLA nas bases do país. Toque em uma base para ver as unidades alocadas.',
  'radar.selectBase': 'Selecione uma base no mapa para ver suas aeronaves.',
  'radar.aircraft': 'Aeronaves nesta base',
  'radar.type': 'Tipo',
  'radar.status': 'Status',
  'radar.disclaimer':
    'Distribuição de referência da frota. Não é um sistema de rastreamento ADS-B ao vivo.',

  'weather.eyebrow': 'Meteorologia aeronáutica',
  'weather.title': 'Condições nos aeroportos do país',
  'weather.lead': 'Mapa ao vivo e leitura simplificada de METAR e TAF para planejamento de voo.',
  'weather.layerWind': 'Vento',
  'weather.layerClouds': 'Nuvens',
  'weather.layerRain': 'Chuva',
  'weather.mapTitle': 'Mapa meteorológico ao vivo do Paraguai',
  'weather.mapUnavailable': 'O mapa ao vivo está indisponível',
  'weather.mapUnavailableDesc':
    'Não foi possível carregar o mapa meteorológico externo. As leituras por estação continuam abaixo.',
  'weather.openWindy': 'Abrir no Windy',
  'weather.wind': 'Vento',
  'weather.clouds': 'Nebulosidade',
  'weather.precip': 'Precipitação',
  'weather.showRaw': 'Ver METAR / TAF',
  'weather.hideRaw': 'Ocultar relatório',
  'weather.disclaimer':
    'Dados de referência em formato METAR/TAF real, fornecidos como demonstração. Não usar para planejamento operacional: consulte sempre a fonte oficial da DINAC antes de voar.',

  'community.eyebrow': 'Comunidade de Pilotos',
  'community.title': 'A rede exclusiva para aviadores e comandantes executivos no Paraguai',
  'community.lead':
    'Um espaço para conectar pilotos habilitados com operadores e voos disponíveis. Estamos formando a primeira geração de membros fundadores.',
  'community.badgesTitle': 'Insígnias da comunidade',
  'community.badgesLead':
    'Distintivos que a plataforma concederá aos membros após validar seu perfil.',
  'community.dashboardTitle': 'Como será a plataforma',
  'community.dashboardLead':
    'Visão conceitual do painel de pilotos em desenvolvimento. O design final pode variar.',
  'community.formTitle': 'Pré-registro de pilotos',
  'community.formLead': 'Deixe seus dados e entraremos em contato para você integrar a primeira geração.',
  'community.hours': 'Horas de voo',
  'community.license': 'Tipo de licença',
  'community.submit': 'Solicitar acesso',
  'community.sent': 'Abrimos o WhatsApp com sua solicitação',
  'community.sentDesc':
    'Se não abriu automaticamente, escreva para nós e incluiremos você na lista de pilotos.',
  'community.another': 'Cadastrar outro piloto',
  'community.privacyNote':
    'Não pedimos o número da licença por este canal. A validação é feita depois, por via formal.',

  'footer.tagline':
    'O novo padrão em aviação privada e helicópteros no Paraguai. Voos fretados domésticos sob demanda, com concierge dedicado 24/7.',
  'footer.conciergeEyebrow': 'Concierge',
  'footer.ctaTitle': 'Pronto para elevar',
  'footer.ctaTitle2': 'sua próxima viagem?',
  'footer.ctaLead':
    'Nossa equipe está disponível 24 horas para desenhar a experiência de voo perfeita.',
  'footer.contact': 'Contato',
  'footer.rights': 'Todos os direitos reservados.',
};

const de = {
  'common.currencyNote': 'Alle Preise werden in US-Dollar angegeben',
  'common.language': 'Sprache',
  'common.soon': 'Demnächst',
  'common.close': 'Schließen',
  'common.name': 'Name',
  'common.email': 'E-Mail',
  'common.phone': 'Telefon',
  'common.send': 'Senden',
  'common.notice': 'Dieser Abschnitt ist auf Spanisch verfügbar.',

  'nav.products': 'Produkte',
  'nav.company': 'Unternehmen',
  'nav.taxiAereo': 'Lufttaxi',
  'nav.panoramic': 'Rundflüge',
  'nav.shared': 'Geteilte Flüge',
  'nav.emptyLegs': 'Leerflüge',
  'nav.experiences': 'Exklusive Erlebnisse',
  'nav.acquisition': 'Flugzeugkauf',
  'nav.about': 'Über uns',
  'nav.app': 'App',
  'nav.safety': 'Sicherheit',
  'nav.privacy': 'Datenschutzerklärung',
  'nav.membership': 'VOLA Mitgliedschaft',
  'nav.community': 'Piloten-Community',
  'nav.contact': 'Kontakt',
  'nav.concierge': 'Concierge kontaktieren',
  'nav.openMenu': 'Menü öffnen',
  'nav.more': 'Mehr',

  'hero.title': 'Die führende Plattform für Privatjets und Charterflüge in Paraguay',
  'hero.subtitle':
    'Inlandscharter und Hubschrauber auf Abruf. Berechnen Sie Ihre Route in Sekunden und koordinieren Sie den Flug mit einem persönlichen Concierge.',
  'hero.stat.concierge': 'Persönlicher Concierge',
  'hero.stat.airports': 'Bediente Flughäfen',
  'hero.stat.response': 'Reaktionszeit',
  'hero.stat.privacy': 'Garantierte Diskretion',

  'quoter.oneWay': 'Einfacher Flug',
  'quoter.roundTrip': 'Hin- und Rückflug',
  'quoter.origin': 'Abflug',
  'quoter.destination': 'Ziel',
  'quoter.originPlaceholder': 'Abflugort eingeben',
  'quoter.destinationPlaceholder': 'Zielort eingeben',
  'quoter.swap': 'Abflug und Ziel tauschen',
  'quoter.departDate': 'Hinflug',
  'quoter.returnDate': 'Rückflug',
  'quoter.passengers': 'Passagiere',
  'quoter.passenger_one': 'Passagier',
  'quoter.passenger_other': 'Passagiere',
  'quoter.search': 'Flug suchen',
  'quoter.calculating': 'Optimale Route wird berechnet…',
  'quoter.estimate': 'Richtwert',
  'quoter.roundTripSuffix': '(Hin- und Rückflug)',
  'quoter.confirm': 'Per WhatsApp bestätigen',
  'quoter.newSearch': 'Neue Suche',
  'quoter.disclaimer':
    'Schätzung auf Basis der Streckenlänge. Den endgültigen Preis bestätigt der Concierge je nach Flugzeug, Zeitplan und Verfügbarkeit.',
  'quoter.errorEmpty': 'Bitte Abflug und Ziel wählen.',
  'quoter.errorSame': 'Abflug und Ziel dürfen nicht identisch sein.',
  'quoter.noResults': 'Keine Ergebnisse',

  'routes.eyebrow': 'Häufige Strecken',
  'routes.title': 'Häufige Strecken & beliebte Ziele in Paraguay',
  'routes.lead':
    'Die am häufigsten angefragten Verbindungen, mit realen Flugzeiten und dem passenden Flugzeugtyp für jede Strecke.',
  'routes.flightTime': 'Flugzeit',
  'routes.aircraft': 'Flugzeug',
  'routes.quote': 'Diese Strecke anfragen',

  'radar.eyebrow': 'Flottenradar',
  'radar.title': 'Unsere Flotte nach Einsatzbasis',
  'radar.lead':
    'Verteilung der VOLA-Flotte auf die Basen im Land. Tippen Sie auf eine Basis, um die dort stationierten Flugzeuge zu sehen.',
  'radar.selectBase': 'Wählen Sie eine Basis auf der Karte, um ihre Flugzeuge zu sehen.',
  'radar.aircraft': 'Flugzeuge an dieser Basis',
  'radar.type': 'Typ',
  'radar.status': 'Status',
  'radar.disclaimer':
    'Referenzverteilung der Flotte. Dies ist kein Live-ADS-B-Tracking.',

  'weather.eyebrow': 'Luftfahrtwetter',
  'weather.title': 'Bedingungen an den Flughäfen des Landes',
  'weather.lead': 'Live-Karte und vereinfachte METAR- und TAF-Meldungen für die Flugplanung.',
  'weather.layerWind': 'Wind',
  'weather.layerClouds': 'Wolken',
  'weather.layerRain': 'Regen',
  'weather.mapTitle': 'Live-Wetterkarte von Paraguay',
  'weather.mapUnavailable': 'Die Live-Karte ist nicht verfügbar',
  'weather.mapUnavailableDesc':
    'Die externe Wetterkarte konnte nicht geladen werden. Die Stationsmeldungen finden Sie weiter unten.',
  'weather.openWindy': 'In Windy öffnen',
  'weather.wind': 'Wind',
  'weather.clouds': 'Bewölkung',
  'weather.precip': 'Niederschlag',
  'weather.showRaw': 'METAR / TAF anzeigen',
  'weather.hideRaw': 'Bericht ausblenden',
  'weather.disclaimer':
    'Referenzdaten im echten METAR/TAF-Format, als Demonstration bereitgestellt. Nicht für die operative Planung verwenden: Prüfen Sie vor dem Flug stets die offizielle DINAC-Quelle.',

  'community.eyebrow': 'Piloten-Community',
  'community.title': 'Das exklusive Netzwerk für Flieger und Executive-Kapitäne in Paraguay',
  'community.lead':
    'Ein Ort, der lizenzierte Piloten mit Betreibern und verfügbaren Flügen verbindet. Wir stellen gerade die erste Generation von Gründungsmitgliedern zusammen.',
  'community.badgesTitle': 'Community-Abzeichen',
  'community.badgesLead':
    'Auszeichnungen, welche die Plattform Mitgliedern nach Prüfung ihres Profils verleiht.',
  'community.dashboardTitle': 'So wird die Plattform aussehen',
  'community.dashboardLead':
    'Konzeptansicht des Piloten-Dashboards in Entwicklung. Das endgültige Design kann abweichen.',
  'community.formTitle': 'Piloten-Voranmeldung',
  'community.formLead':
    'Hinterlassen Sie Ihre Daten und wir melden uns, damit Sie zur ersten Generation gehören.',
  'community.hours': 'Flugstunden',
  'community.license': 'Lizenztyp',
  'community.submit': 'Zugang anfragen',
  'community.sent': 'WhatsApp wurde mit Ihrer Anfrage geöffnet',
  'community.sentDesc':
    'Falls es sich nicht automatisch geöffnet hat, schreiben Sie uns und wir nehmen Sie in die Pilotenliste auf.',
  'community.another': 'Weiteren Piloten eintragen',
  'community.privacyNote':
    'Wir fragen über diesen Kanal nicht nach Ihrer Lizenznummer. Die Prüfung erfolgt später auf formellem Weg.',

  'footer.tagline':
    'Der neue Standard für Privatluftfahrt und Hubschrauber in Paraguay. Inlandscharterflüge auf Abruf, mit persönlichem Concierge rund um die Uhr.',
  'footer.conciergeEyebrow': 'Concierge',
  'footer.ctaTitle': 'Bereit, Ihre nächste',
  'footer.ctaTitle2': 'Reise zu veredeln?',
  'footer.ctaLead':
    'Unser Team ist rund um die Uhr verfügbar, um das perfekte Flugerlebnis zu gestalten.',
  'footer.contact': 'Kontakt',
  'footer.rights': 'Alle Rechte vorbehalten.',
};

export const TRANSLATIONS = { es, en, pt, de };

/** Resuelve una clave con fallback al español. */
export function translate(lang, key) {
  return TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS[DEFAULT_LANG][key] ?? key;
}
