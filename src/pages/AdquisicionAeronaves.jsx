import ComingSoon from '../components/ComingSoon';

export default function AdquisicionAeronaves() {
  return (
    <ComingSoon
      product="Adquisición de aeronaves"
      title="Comprar, vender y administrar tu aeronave"
      description="Asesoramiento integral para incorporar una aeronave: evaluación, importación, matriculación y gestión operativa."
      bullets={[
        'Búsqueda y evaluación técnica de aeronaves en el mercado internacional.',
        'Gestión de importación, matriculación y trámites ante la DINAC.',
        'Administración operativa: tripulación, hangaraje y mantenimiento.',
        'Programa de renta para amortizar costos cuando no la estés usando.',
      ]}
    />
  );
}
