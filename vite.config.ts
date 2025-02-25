import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [reactRouter()],
  base: '/rss-react-pb/react-router-ssr',
  build: {
    outDir: 'dist/react-router-ssr',
  },
});
