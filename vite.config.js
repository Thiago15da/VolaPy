import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // <--- ESTO ES LO QUE HAY QUE CAMBIAR
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
});
