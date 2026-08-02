/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0F172A',
          900: '#111111',
          800: '#1a1a1a',
          700: '#222222',
        },
        signal: {
          green: '#16A34A',
          whatsapp: '#25D366',
          amber: '#C9A961',
          red: '#DC2626',
        },
        cloud: {
          50: '#FFFFFF',
          100: '#F8F9FA',
          200: '#F1F3F5',
          300: '#E9ECEF',
        },
        gold: {
          400: '#C9A961',
          500: '#B8945A',
          600: '#A8893F',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'ui-sans-serif', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.035em',
      },
      maxWidth: {
        container: '1200px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(17,17,17,0.04), 0 1px 3px rgba(17,17,17,0.03)',
        card: '0 1px 3px rgba(17,17,17,0.05), 0 4px 16px rgba(17,17,17,0.04)',
        lift: '0 8px 32px rgba(17,17,17,0.08), 0 2px 8px rgba(17,17,17,0.04)',
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
