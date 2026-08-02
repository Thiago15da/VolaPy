import ComingSoon from '../components/ComingSoon';

export default function VuelosCompartidos() {
  return (
    <ComingSoon
      product="Vuelos compartidos"
      title="Compartí el vuelo, dividí el costo"
      description="Rutas frecuentes con asientos individuales: accedé a la aviación privada pagando sólo tu lugar."
      bullets={[
        'Reservá asientos sueltos en rutas ya programadas.',
        'Tarifa por pasajero, no por aeronave completa.',
        'Salidas recurrentes entre Asunción, Ciudad del Este y Encarnación.',
        'Mismo estándar de servicio y terminal privada que un charter.',
      ]}
    />
  );
}
