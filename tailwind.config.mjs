/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // Grid de 8 puntos (spec §6.2). Nombrados para que las clases
      // Tailwind documenten la intencion, ej. p-space-4, gap-space-3.
      spacing: {
        'space-1': '8px',
        'space-2': '16px',
        'space-3': '24px',
        'space-4': '32px',
        'space-5': '40px',
        'space-6': '48px',
        'space-7': '56px',
        'space-8': '64px',
        'space-9': '72px',
        'space-10': '80px',
      },
      maxWidth: {
        container: '1344px',
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
};
