import { defineConfig } from 'vite';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => ({
  // Базовий шлях: dev -> '/', build -> '/goit-js-hw-10/'
  base: command === 'serve' ? '/' : '/goit-js-hw-10/',

  define: {
    [command === 'serve' ? 'global' : '_global']: {},
  },

  build: {
    sourcemap: true,
    outDir: 'dist',        // Папка для збірки
    emptyOutDir: true,     // Очищати dist перед build
    rollupOptions: {
      // Точки входу — всі HTML
      input: {
        index: './index.html',               // якщо index у корені
        timer: './src/1-timer.html',        // інші сторінки в src
        snackbar: './src/2-snackbar.html',
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor';
        },
        entryFileNames: chunkInfo =>
          chunkInfo.name === 'commonHelpers' ? 'commonHelpers.js' : '[name].js',
        assetFileNames: assetInfo =>
          assetInfo.name?.endsWith('.html') ? '[name].[ext]' : 'assets/[name]-[hash][extname]',
      },
    },
  },

  plugins: [
    // Авто-перезавантаження для всіх HTML
    FullReload(['./*.html', './src/*.html']),
    SortCss({ sort: 'mobile-first' }),
  ],
}));
