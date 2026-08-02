import { Star, ShieldCheck } from 'lucide-react';
import { DEMO_DATA, TRUST_POINTS } from '../data';

/**
 * Prueba social del Hero.
 *
 * ⚠️  La variante Trustpilot es MAQUETA. Se apaga poniendo
 * DEMO_DATA.enabled = false en src/data.js, y entonces cae automáticamente
 * a la variante propia, que sólo muestra afirmaciones verificables.
 * No publicar la variante Trustpilot sin un perfil real detrás.
 */
export default function TrustBadge({ dark = false }) {
  const { enabled, trustpilot } = DEMO_DATA;

  if (!enabled) return <OwnTrust dark={dark} />;

  const text = dark ? 'text-white' : 'text-ink-900';
  const sub = dark ? 'text-white/60' : 'text-gray-400';

  return (
    <div
      className={`inline-flex items-center gap-3 rounded-full px-4 py-2.5 ${
        dark ? 'bg-white/10 backdrop-blur-md border border-white/15' : 'bg-white border border-gray-200'
      }`}
    >
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: trustpilot.stars }).map((_, i) => (
          <Star key={i} size={14} className="fill-signal-green text-signal-green" />
        ))}
      </div>
      <span className={`text-sm font-semibold ${text}`}>{trustpilot.score}</span>
      <span className={`text-xs ${sub}`}>
        Trustpilot · {trustpilot.reviews} reseñas
      </span>
    </div>
  );
}

function OwnTrust({ dark }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
      {TRUST_POINTS.map((p) => (
        <span
          key={p}
          className={`inline-flex items-center gap-1.5 text-xs ${dark ? 'text-white/75' : 'text-gray-500'}`}
        >
          <ShieldCheck size={14} className="text-signal-green" />
          {p}
        </span>
      ))}
    </div>
  );
}
