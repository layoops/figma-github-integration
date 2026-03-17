import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  esbuild: {
    jsxFactory: 'figma.widget.h',
    jsxFragment: 'figma.widget.Fragment',
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    minify: mode === 'production',
    target: 'es6',
    rollupOptions: {
      input: 'src/widget/app/app.tsx',
      output: {
        format: 'iife',
        entryFileNames: 'widget.js',
      },
    },
  },
}));
