import { defineConfig } from 'vite';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/goit-js-hw-10/',

  define: {
    [command === 'serve' ? 'global' : '_global']: {},
  },

  build: {
    sourcemap: true,
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: './index.html',
        timer: './src/1-timer.html',
        snackbar: './src/2-snackbar.html',
      },
      output: {
        // Всі JS у корінь dist, щоб шляхи у HTML працювали на GitHub Pages
        entryFileNames: '[name].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },

  plugins: [
    FullReload(['./*.html', './src/*.html']),
    SortCss({ sort: 'mobile-first' }),
  ],
}));
