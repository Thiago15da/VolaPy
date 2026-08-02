import { useEffect } from 'react';

const BASE_TITLE = 'VOLA | Aviación Privada & Helicópteros en Paraguay';

/**
 * Sin renderizado en servidor, el título y la descripción no cambian solos
 * al navegar entre rutas. Este hook los sincroniza en cada página.
 */
export default function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | VOLA` : BASE_TITLE;

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }
  }, [title, description]);
}
