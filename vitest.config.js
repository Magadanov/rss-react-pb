import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      include: ['**/*.tsx'],
      exclude: [
        '**/node_modules/**',
        '**/*.test.tsx',
        '**/*.spec.tsx',
        'src/__tests__/setup.ts',
      ],
    },
  },
});
