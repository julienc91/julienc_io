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
          // additionalData: `@import "./src/globals.scss";`,
        },
      },
    },
  },
  // Configure markdown support
  markdown: {
    syntaxHighlight: 'prism',
  },
});
