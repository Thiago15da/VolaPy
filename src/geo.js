/**
 * Geometría del mapa de Paraguay.
 *
 * El contorno del país y los marcadores de aeropuertos usan la MISMA
 * proyección, por lo que las posiciones quedan alineadas por construcción:
 * cambiar el viewBox o el contorno no descoloca los marcadores.
 */

/** Caja geográfica del lienzo (con un margen sobre los extremos reales del país). */
export const BOUNDS = {
  minLng: -63.2,
  maxLng: -53.7,
  minLat: -28.1,
  maxLat: -18.8,
};

/** Dimensiones del viewBox SVG. */
export const VIEWBOX = { width: 1000, height: 1000 };

/**
 * Proyección equirectangular simple: suficiente y estable a la escala de
 * un solo país. Corrige la compresión de longitud por la latitud media
 * para que el país no salga estirado horizontalmente.
 */
const MID_LAT_RAD = (((BOUNDS.minLat + BOUNDS.maxLat) / 2) * Math.PI) / 180;
const LNG_SPAN = (BOUNDS.maxLng - BOUNDS.minLng) * Math.cos(MID_LAT_RAD);
const LAT_SPAN = BOUNDS.maxLat - BOUNDS.minLat;

/** Escala única para ambos ejes: preserva la relación de aspecto real. */
const SCALE = Math.min(VIEWBOX.width / LNG_SPAN, VIEWBOX.height / LAT_SPAN);
const OFFSET_X = (VIEWBOX.width - LNG_SPAN * SCALE) / 2;
const OFFSET_Y = (VIEWBOX.height - LAT_SPAN * SCALE) / 2;

/** Convierte coordenadas geográficas a coordenadas del viewBox SVG. */
export function project(lng, lat) {
  const x = (lng - BOUNDS.minLng) * Math.cos(MID_LAT_RAD) * SCALE + OFFSET_X;
  const y = (BOUNDS.maxLat - lat) * SCALE + OFFSET_Y;
  return { x, y };
}

/** Interpola entre dos puntos geográficos (t de 0 a 1). */
export function interpolate(a, b, t) {
  return { lat: a.lat + (b.lat - a.lat) * t, lng: a.lng + (b.lng - a.lng) * t };
}

/** Distancia de círculo máximo en km entre dos puntos {lat, lng}. */
export function haversineKm(a, b) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Rumbo en grados de A hacia B, para orientar el icono de la aeronave. */
export function bearing(a, b) {
  const dx = (b.lng - a.lng) * Math.cos(MID_LAT_RAD);
  const dy = a.lat - b.lat;
  return (Math.atan2(dx, dy) * 180) / Math.PI;
}

/**
 * Contorno simplificado de Paraguay en [lng, lat], en sentido horario
 * desde el extremo norte (Bahía Negra). Aproximación cartográfica
 * pensada para lectura visual, no para navegación.
 */
export const PARAGUAY_OUTLINE = [
  [-58.16, -19.29], [-57.85, -20.2], [-57.95, -21.2], [-57.88, -22.1],
  [-56.6, -22.25], [-55.75, -22.3], [-55.55, -23.25], [-55.05, -23.98],
  [-54.45, -24.02], [-54.28, -24.6], [-54.45, -25.2], [-54.62, -25.6],
  [-54.72, -26.3], [-55.15, -26.95], [-55.75, -27.35], [-56.35, -27.55],
  [-57.3, -27.45], [-58.05, -27.3], [-58.62, -27.3], [-58.35, -26.7],
  [-58.05, -26.0], [-57.75, -25.45], [-57.75, -25.25], [-58.35, -24.9],
  [-59.1, -24.55], [-60.05, -24.0], [-61.05, -23.35], [-62.3, -22.55],
  [-62.64, -22.2], [-62.28, -21.05], [-62.15, -20.5], [-61.7, -20.1],
  [-60.2, -19.6], [-59.1, -19.35],
];

/** Traza del Río Paraguay, que parte el país entre Oriental y Chaco. */
export const PARAGUAY_RIVER = [
  [-57.95, -20.6], [-57.6, -21.7], [-57.6, -22.6], [-57.5, -23.4],
  [-57.6, -24.1], [-57.55, -24.7], [-57.72, -25.28], [-57.95, -26.0],
  [-58.25, -26.7], [-58.6, -27.3],
];

/** Convierte una lista de [lng, lat] en el atributo `points` de un polígono SVG. */
export function toPoints(coords) {
  return coords
    .map(([lng, lat]) => {
      const { x, y } = project(lng, lat);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

/** Convierte una lista de [lng, lat] en el atributo `d` de un path SVG. */
export function toPath(coords) {
  return coords
    .map(([lng, lat], i) => {
      const { x, y } = project(lng, lat);
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}
