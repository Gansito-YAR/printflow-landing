// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// Sin `site`, Astro resuelve Astro.url contra localhost durante el build y la
// vista previa social (og:url) se publica apuntando a localhost. Se toma del
// entorno para que cada deploy declare su propio dominio.
const site = process.env.PUBLIC_SITE_URL;

// https://astro.build/config
export default defineConfig({
  ...(site ? { site } : {}),
  vite: {
    plugins: [tailwindcss()],
  },
});
