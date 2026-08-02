/** @type {import('tailwindcss').Config} */

/*
 * Paleta de marca VOLA Paraguay.
 *
 * Valores muestreados del manual entregado por el cliente, no estimados a
 * ojo: el navy del isotipo, el navy de fondo y el rojo del ala.
 *
 * La escala `ink` conserva su nombre —la usan más de 120 clases— pero sus
 * valores pasaron de negro puro a navy de marca, así que el cambio de
 * identidad propaga sin reescribir cada clase.
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050F1B', // fondo profundo del manual
          900: '#0A1A34', // navy del isotipo y el wordmark
          800: '#101E3C',
          700: '#192D4E', // azul medio del degradado del ala
        },
        brand: {
          red: '#C41425', // rojo del ala derecha (bandera)
          redDark: '#A50F1D', // estado hover
          redTint: 'rgba(196,20,37,0.10)',
          white: '#FFFFFF',
        },
        // Colores de señal: significado funcional, no identidad de marca.
        // El rojo IFR y el de error siguen la convención aeronáutica y de
        // formularios, y se distinguen del rojo de marca por contexto
        // (texto pequeño con icono, nunca un botón lleno).
        signal: {
          green: '#16A34A',
          whatsapp: '#25D366',
          blue: '#2563EB',
          red: '#DC2626',
        },
        cloud: {
          50: '#FFFFFF',
          100: '#F8F9FA',
          200: '#F1F3F5',
          300: '#E9ECEF',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'ui-sans-serif', 'sans-serif'],
        // Geométrica fina del logotipo y los antetítulos.
        brand: ['Jost', 'Plus Jakarta Sans', 'ui-sans-serif', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.035em',
        brand: '0.3em',
      },
      maxWidth: {
        container: '1200px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(5,15,27,0.05), 0 1px 3px rgba(5,15,27,0.04)',
        card: '0 1px 3px rgba(5,15,27,0.06), 0 4px 16px rgba(5,15,27,0.05)',
        lift: '0 8px 32px rgba(5,15,27,0.10), 0 2px 8px rgba(5,15,27,0.05)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.4,0,0.2,1) both',
      },
    },
  },
  plugins: [],
};
