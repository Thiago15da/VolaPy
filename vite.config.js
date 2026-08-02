import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // El sitio se sirve en la raíz del dominio propio (vola.com.py),
  // fijado por public/CNAME en cada deploy de GitHub Pages.
  base: '/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
});
