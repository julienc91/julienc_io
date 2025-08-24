import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://julienc.io',
  integrations: [
    // Enable React for interactive components
    react(),
    // Generate sitemap
    sitemap(),
  ],
  // Enable SCSS support
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // If you have global imports, you can add them here
          // additionalData: `@use "./src/globals.scss" as g;`,
        },
      },
    },
    // Workaround for Font Awesome v7 + react-fontawesome v3 importing package.json in ESM.
    // Force bundling these packages during SSR so JSON imports are transformed by Vite.
    // https://github.com/FortAwesome/react-fontawesome/issues/589
    ssr: {
      noExternal: [
        '@fortawesome/react-fontawesome'
      ],
    },
  },
  // Configure markdown support
  markdown: {
    syntaxHighlight: 'prism',
  },
});
