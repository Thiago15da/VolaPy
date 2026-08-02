import ComingSoon from '../components/ComingSoon';

export default function EmptyLegsPage() {
  return (
    <ComingSoon
      product="Empty legs"
      title="Vuelos de oportunidad, en tiempo real"
      description="Cuando una aeronave debe reposicionarse vacía, ese tramo se publica con descuentos de hasta 45%. Estamos construyendo el listado en vivo."
      bullets={[
        'Listado actualizado de tramos disponibles con su descuento.',
        'Alertas por WhatsApp cuando aparezca una ruta que te sirva.',
        'Reserva directa sin pasar por cotización.',
        'Disponibilidad limitada: los empty legs se confirman con poca antelación.',
      ]}
    />
  );
}
