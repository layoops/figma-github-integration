import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  resolve: {
    alias: {
      '@primer/react/dist/experimental': path.resolve(
        __dirname,
        'node_modules/@primer/react/src/experimental'
      ),
    },
    tsconfigPaths: true,
  },
  envDir: '../../',
  root: `./src/iframe/app`,
  plugins: [
    tanstackRouter({
      target: 'react',
      generatedRouteTree: '../shared/routing/routeTree.gen.ts',
      routesDirectory: './routing',
    }),
    react(),
    viteSingleFile({ useRecommendedBuildConfig: true }),
  ],
  build: {
    target: 'esnext',
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    outDir: `../../../dist`,
  },
});
