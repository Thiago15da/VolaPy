import Experiences from '../components/Experiences';
import PageHeader from '../components/PageHeader';
import { EXPERIENCES } from '../data';
import usePageMeta from '../usePageMeta';

export default function ExperienciasExclusivas() {
  usePageMeta(
    'Experiencias Exclusivas',
    'Sobrevuelos románticos, piloto por un día, escapadas a estancias y llegadas VIP en helicóptero.'
  );

  return (
    <>
      <PageHeader
        eyebrow="Experiencias exclusivas"
        title="Vuelos que se recuerdan"
        description="Packs diseñados alrededor de un momento: una propuesta al atardecer, una escapada al Chaco o una llegada que nadie olvida."
        image={EXPERIENCES[0].image}
      />
      <Experiences />
    </>
  );
}
