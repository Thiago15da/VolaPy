import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import TaxiAereo from './pages/TaxiAereo';
import VuelosPanoramicos from './pages/VuelosPanoramicos';
import VuelosCompartidos from './pages/VuelosCompartidos';
import EmptyLegsPage from './pages/EmptyLegsPage';
import ExperienciasExclusivas from './pages/ExperienciasExclusivas';
import AdquisicionAeronaves from './pages/AdquisicionAeronaves';
import SobreNosotros from './pages/SobreNosotros';
import AppPage from './pages/AppPage';
import Seguridad from './pages/Seguridad';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import Membresia from './pages/Membresia';
import ComunidadPilotos from './pages/ComunidadPilotos';
import Contacto from './pages/Contacto';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />

        {/* Productos */}
        <Route path="taxi-aereo" element={<TaxiAereo />} />
        <Route path="vuelos-panoramicos" element={<VuelosPanoramicos />} />
        <Route path="vuelos-compartidos" element={<VuelosCompartidos />} />
        <Route path="empty-legs" element={<EmptyLegsPage />} />
        <Route path="experiencias-exclusivas" element={<ExperienciasExclusivas />} />
        <Route path="adquisicion-aeronaves" element={<AdquisicionAeronaves />} />

        {/* Empresa */}
        <Route path="sobre-nosotros" element={<SobreNosotros />} />
        <Route path="app" element={<AppPage />} />
        <Route path="seguridad" element={<Seguridad />} />
        <Route path="politica-privacidad" element={<PoliticaPrivacidad />} />

        {/* Directos */}
        <Route path="membresia" element={<Membresia />} />
        <Route path="comunidad" element={<ComunidadPilotos />} />
        <Route path="contacto" element={<Contacto />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
