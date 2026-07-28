import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://julienc.io',
  // Astro 7 changed the default to 'jsx', which strips the whitespace between
  // adjacent inline elements (e.g. between an icon and its label). Keep the
  // pre-v7 HTML-aware compression so rendered spacing is unchanged.
  compressHTML: true,
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
  },
  // Configure markdown support
  markdown: {
    syntaxHighlight: 'prism',
  },
});
