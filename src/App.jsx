import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Fleet from './components/Fleet';
import EmptyLegs from './components/EmptyLegs';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-svh bg-ink-950 text-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Fleet />
        <EmptyLegs />
      </main>
      <Footer />
    </div>
  );
}
