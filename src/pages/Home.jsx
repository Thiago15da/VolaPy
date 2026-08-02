import Hero from '../components/Hero';
import Features from '../components/Features';
import Experiences from '../components/Experiences';
import Fleet from '../components/Fleet';
import FleetRadar from '../components/FleetRadar';
import FrequentRoutes from '../components/FrequentRoutes';
import usePageMeta from '../usePageMeta';

export default function Home() {
  usePageMeta(
    null,
    'VOLA — Aviación privada y helicópteros en Paraguay. Cotizá tu vuelo charter en segundos y coordiná con un concierge dedicado 24/7.'
  );

  return (
    <>
      <Hero />
      <Features />
      <FrequentRoutes />
      <Experiences />
      <Fleet />
      <FleetRadar />
    </>
  );
}
