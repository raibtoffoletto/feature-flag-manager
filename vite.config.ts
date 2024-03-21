import react from '@vitejs/plugin-react';
import { join } from 'path';
import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';
import type { InlineConfig } from 'vitest';
import { dependencies } from './package.json';

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

function renderChunks(deps: Record<string, string>) {
  const chunks = {};

  Object.keys(deps).forEach((key) => {
    if (['react', 'react-router-dom', 'react-dom'].includes(key)) {
      return;
    }

    chunks[key] = [key];
  });

  return chunks;
}

const config: VitestConfigExport = {
  plugins: [react()],

  resolve: {
    alias: {
      '@api': join(__dirname, 'src/api'),
      '@components': join(__dirname, 'src/components'),
      '@constants': join(__dirname, 'src/types/constants.ts'),
      '@contexts': join(__dirname, 'src/contexts'),
      '@hooks': join(__dirname, 'src/hooks'),
      '@lib': join(__dirname, 'src/lib'),
      '@msw-handler': join(__dirname, 'src/msw/handleEnvironment.ts'),
      '@msw': join(__dirname, 'src/msw/index.ts'),
      '@test-data': join(__dirname, 'src/msw/data/index.ts'),
      '@testIds': join(__dirname, 'src/tests/ids.ts'),
      '@tests': join(__dirname, 'src/tests/index.ts'),
      '@views': join(__dirname, 'src/views'),
    },
  },

  root: __dirname,

  base: './',

  server: {
    port: 3000,
  },

  build: {
    target: 'esnext',

    emptyOutDir: true,

    sourcemap: false,

    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-router-dom', 'react-dom'],
          ...renderChunks(dependencies),
        },
      },
    },
  },

  test: {
    globals: true,

    environment: 'jsdom',

    setupFiles: './src/tests/setup.ts',

    coverage: {
      provider: 'istanbul',
      exclude: [
        '**/public/**',
        '**/src/main.tsx',
        '**/src/views/Router.tsx',
        '**/src/msw/**',
        '**/src/tests/**',
        '**/src/types/**',
      ],
    },
  },
};

export default defineConfig(config);
