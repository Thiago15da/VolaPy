import { BRAND_MARK_SRC } from '../data';

/**
 * Logotipo VOLA Paraguay.
 *
 * El wordmark se compone tipográficamente y es fiel al manual: geométrica
 * fina, tracking amplio y la bajada PARAGUAY entre reglas.
 *
 * El isotipo (las dos alas con la bandera) NO se dibuja acá a propósito:
 * el material recibido son mockups en JPEG, y una reconstrucción a mano
 * sería una interpretación distinta de la identidad real. En cuanto el
 * diseñador entregue el vectorial, basta con apuntar BRAND_MARK_SRC en
 * src/data.js al archivo y el isotipo aparece en todos los lugares donde
 * se usa este componente.
 */
export default function Logo({ variant = 'dark', size = 'md', withTagline = false, className = '' }) {
  const onDark = variant === 'light';

  const sizes = {
    sm: { word: 'text-lg', track: '0.26em', sub: 'text-[0.5rem]', mark: 'h-6' },
    md: { word: 'text-xl md:text-2xl', track: '0.3em', sub: 'text-[0.5rem]', mark: 'h-7 md:h-8' },
    lg: { word: 'text-3xl md:text-4xl', track: '0.32em', sub: 'text-[0.625rem]', mark: 'h-12 md:h-14' },
  }[size];

  const wordColor = onDark ? 'text-white' : 'text-ink-900';
  const subColor = onDark ? 'text-white/55' : 'text-ink-700/70';
  const ruleColor = onDark ? 'bg-white/30' : 'bg-ink-900/25';

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      {BRAND_MARK_SRC && (
        <img src={BRAND_MARK_SRC} alt="" aria-hidden="true" className={`${sizes.mark} w-auto`} />
      )}

      <span className="inline-flex flex-col items-center leading-none">
        <span
          className={`font-brand font-light ${sizes.word} ${wordColor}`}
          // El tracking amplio deja un hueco visual a la derecha; el margen
          // negativo lo compensa para que el bloque quede ópticamente centrado.
          style={{ letterSpacing: sizes.track, marginRight: `-${sizes.track}` }}
        >
          VOLA
        </span>

        <span className="mt-1 flex w-full items-center gap-1.5">
          <span className={`h-px flex-1 ${ruleColor}`} />
          <span
            className={`font-brand font-light uppercase ${sizes.sub} ${subColor}`}
            style={{ letterSpacing: '0.24em', marginRight: '-0.24em' }}
          >
            Paraguay
          </span>
          <span className={`h-px flex-1 ${ruleColor}`} />
        </span>

        {withTagline && (
          <span
            className={`mt-2 font-brand text-[0.5rem] font-light uppercase ${subColor}`}
            style={{ letterSpacing: '0.2em', marginRight: '-0.2em' }}
          >
            Vuelos privados y experiencias exclusivas
          </span>
        )}
      </span>
    </span>
  );
}
