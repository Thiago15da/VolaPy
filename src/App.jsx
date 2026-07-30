import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Experiences from './components/Experiences';
import Fleet from './components/Fleet';
import EmptyLegs from './components/EmptyLegs';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-svh bg-cloud-50 text-ink-900">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Experiences />
        <Fleet />
        <EmptyLegs />
      </main>
      <Footer />
    </div>
  );
}
