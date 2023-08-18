import type { UserConfig } from 'vite';
import type { InlineConfig } from 'vitest';
import { join } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
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
      '@msw': join(__dirname, 'src/msw/index.ts'),
      '@tests': join(__dirname, 'src/tests'),
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

    setupFiles: './setupTests.ts',
  },
};

export default defineConfig(config);
