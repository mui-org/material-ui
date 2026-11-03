import { defineConfig, transformWithOxc } from 'vite';
import react from '@vitejs/plugin-react';
import { alias } from '../../vitest.shared.mts';

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
    rolldownOptions: {
      output: {
        keepNames: true,
        minify: {
          mangle: false,
        },
      },
    },
  },
  plugins: [
    {
      // Unfortunately necessary as we opted to write our jsx in js files
      name: 'treat-js-files-as-jsx',
      enforce: 'pre',
      async transform(code, id) {
        if (/\/node_modules\//.test(id)) {
          return null;
        }
        if (!/.*\.js$/.test(id)) {
          return null;
        }
        if (id.startsWith('\0')) {
          return null;
        }
        // Use the exposed transform from vite, instead of directly
        // transforming with esbuild
        return transformWithOxc(code, id, {
          lang: 'tsx',
          jsx: {
            runtime: 'automatic',
          },
        });
      },
    },
    react(),
  ],
  define: {
    'process.env': '{}',
  },
  resolve: {
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
    alias,
  },
  optimizeDeps: {
    force: true,
    rolldownOptions: {
      moduleTypes: {
        '.js': 'tsx',
      },
    },
  },
});
