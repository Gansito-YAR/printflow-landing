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

      // Capa semantica de tokens.css expuesta como utilidades de Tailwind.
      // Ningun componente escribe un color: escribe bg-surface-1, text-ink-base,
      // border-line-hairline. Cambiar la paleta = cambiar tokens.css.
      colors: {
        surface: {
          0: 'var(--surface-0)',
          1: 'var(--surface-1)',
          2: 'var(--surface-2)',
          3: 'var(--surface-3)',
          inverse: 'var(--surface-inverse)',
          brand: 'var(--surface-brand)',
        },
        ink: {
          strong: 'var(--ink-strong)',
          base: 'var(--ink-base)',
          muted: 'var(--ink-muted)',
          inverse: 'var(--ink-inverse)',
          'inverse-muted': 'var(--ink-inverse-muted)',
          brand: 'var(--ink-brand)',
          'on-brand': 'var(--ink-onBrand)',
        },
        line: {
          hairline: 'var(--border-hairline)',
          strong: 'var(--border-strong)',
          inverse: 'var(--border-inverse)',
          brand: 'var(--border-brand)',
        },
        action: {
          primary: 'var(--action-primary-bg)',
          'primary-hover': 'var(--action-primary-bg-hover)',
          'primary-text': 'var(--action-primary-text)',
          'primary-border': 'var(--action-primary-border)',
          'secondary-text': 'var(--action-secondary-text)',
          'secondary-border': 'var(--action-secondary-border)',
          disabled: 'var(--action-disabled-bg)',
          'disabled-text': 'var(--action-disabled-text)',
          'disabled-border': 'var(--action-disabled-border)',
        },
        focus: 'var(--focus-ring)',
      },

      fontFamily: {
        display: ['Anton', 'Arial Narrow', 'Helvetica Neue', 'system-ui', 'sans-serif'],
        sans: [
          'Barlow',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },

      // Escala tipografica tokenizada (Fase 2 §2.4). Sin tamanos sueltos
      // por componente.
      fontSize: {
        h1: ['var(--text-h1)', { lineHeight: '1.1' }],
        'h1-desktop': ['var(--text-h1-desktop)', { lineHeight: '1.05' }],
        h2: ['var(--text-h2)', { lineHeight: '1.15' }],
        'h2-desktop': ['var(--text-h2-desktop)', { lineHeight: '1.15' }],
        h3: ['var(--text-h3)', { lineHeight: '1.3' }],
        body: ['var(--text-body)', { lineHeight: '1.6' }],
        'body-lg': ['var(--text-body-lg)', { lineHeight: '1.6' }],
        small: ['var(--text-small)', { lineHeight: '1.5' }],
        'x-small': ['var(--text-xs)', { lineHeight: '1.4' }],
      },

      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
      },

      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },

      transitionDuration: {
        fast: 'var(--duration-fast)',
        base: 'var(--duration-base)',
      },
    },
  },
};
