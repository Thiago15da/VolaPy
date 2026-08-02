import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_LANG, LANGUAGES, translate } from './i18n';

const STORAGE_KEY = 'vola.lang';
const LanguageContext = createContext(null);

const isSupported = (code) => LANGUAGES.some((l) => l.code === code);

/**
 * Idioma inicial: la preferencia que el visitante eligió antes, o español.
 *
 * A propósito NO se autodetecta el idioma del navegador: VOLA opera en
 * Paraguay y el español es el idioma por defecto del negocio. Detectarlo
 * haría que un visitante local con el navegador en inglés aterrizara en
 * una versión que no pidió.
 */
function initialLang() {
  if (typeof window === 'undefined') return DEFAULT_LANG;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && isSupported(saved)) return saved;
  } catch {
    // Almacenamiento inaccesible (modo privado): se usa el idioma por defecto.
  }
  return DEFAULT_LANG;
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  // El atributo lang del documento importa para lectores de pantalla,
  // para la separación silábica del navegador y para el SEO.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((code) => {
    if (!isSupported(code)) return;
    setLangState(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Modo privado o almacenamiento lleno: el idioma sigue funcionando
      // en esta sesión, sólo no se recuerda para la próxima visita.
    }
  }, []);

  const value = useMemo(
    () => ({ lang, setLang, t: (key) => translate(lang, key) }),
    [lang, setLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage debe usarse dentro de <LanguageProvider>');
  return ctx;
}

/** Atajo para componentes que sólo necesitan traducir. */
export function useT() {
  return useLanguage().t;
}
