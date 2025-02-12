import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/rss-react-pb/app-state-management',
  // build: {
  //   outDir: 'dist/app-state-management',
  // },
});
