import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/rss-react-pb/hooks-and-routing',
  build: {
    outDir: 'dist/hooks-and-routing',
  },
});
