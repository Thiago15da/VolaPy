import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import usePageMeta from '../usePageMeta';

export default function NotFound() {
  usePageMeta('Página no encontrada');

  return (
    <section className="flex min-h-[70svh] items-center">
      <div className="shell text-center">
        <Compass size={32} className="mx-auto mb-6 text-gray-300" />
        <p className="eyebrow mb-4">Error 404</p>
        <h1 className="h-section mx-auto max-w-lg font-display font-extrabold text-ink-900">
          Esta ruta no está en nuestro plan de vuelo
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-gray-500">
          La página que buscás no existe o cambió de dirección. Volvé al inicio o
          escribinos y te orientamos.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link to="/" className="btn-primary">
            Ir al inicio
            <ArrowRight size={16} />
          </Link>
          <Link to="/contacto" className="btn-outline">
            Contactar concierge
          </Link>
        </div>
      </div>
    </section>
  );
}
