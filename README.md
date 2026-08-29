# printflow-landing

Landing page pública de **PrintFlow AI** (Imprenta Escalante). Sitio 100%
estático, sin backend y sin captura de datos. Su única conversión es un deep
link a WhatsApp (`<a href>` real, funciona con JavaScript desactivado).

**Fase actual: Fase 2 — identidad visual.** La estructura de la Fase 1 está
construida y aprobada; esta fase le agrega color de marca, tipografía,
imágenes reales e iconografía.

Especificaciones:

- [`MD/Fase1_FARIDE_Landing_UI.md`](./MD/Fase1_FARIDE_Landing_UI.md) — estructura
- [`MD/Fase2_FARIDE_Landing_Identidad_Visual.md`](./MD/Fase2_FARIDE_Landing_Identidad_Visual.md) — identidad visual
- [`AGENTS.md`](./AGENTS.md) — reglas duras del proyecto

## Stack

Astro 7 + Tailwind CSS 4 + TypeScript estricto. npm.

> **Nota sobre Node.** La §4 de Fase 1 pide *Astro última versión estable* y
> *Node 20 LTS*. Con Astro 7 esas dos condiciones son incompatibles: Astro
> 7.2.2 declara `engines.node >= 22.12.0`. Hoy el proyecto corre en Node 22.
> **Pendiente de decisión de Isaías:** conservar Astro 7 con Node 22, o bajar
> a una versión de Astro compatible con Node 20.

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Variables de entorno

Copia `.env.example` a `.env` y define `PUBLIC_WHATSAPP_E164` (solo dígitos,
código de país, sin `+`) cuando el número oficial esté disponible. Lo entrega
Andri; nunca se hardcodea un número en el código.

```bash
cp .env.example .env
```

Mientras la variable esté vacía, todos los CTA quedan en estado *Disabled* con
el texto "Contacto no disponible" y el FAB de WhatsApp no se renderiza. **Es el
comportamiento esperado, no un bug** — evita exponer un enlace roto.

### `PUBLIC_SITE_URL`

URL pública del deploy. Astro la necesita para generar `og:url`, la URL
canónica y `og:image` como absolutos. Sin ella, esos meta tags se omiten en
lugar de publicarse apuntando a `localhost`. Agrégala a `.env.example` y al
entorno del hosting:

```
# Ejemplo: https://printflow-landing.pages.dev
PUBLIC_SITE_URL=
```

## Sistema de diseño

`src/styles/tokens.css` tiene **dos capas** y es el único lugar del proyecto
donde puede vivir un color literal:

1. **Primitivas** (`--brand-*`, `--neutral-*`): la paleta cruda.
2. **Semánticas** (`--surface-*`, `--ink-*`, `--border-*`, `--action-*`): lo que
   consumen los componentes, a través de clases de Tailwind mapeadas en
   `tailwind.config.mjs`.

Para reajustar la marca se cambia un valor en la capa 1 y el sitio entero se
actualiza con coherencia. Los componentes nunca mencionan `--brand-*`.

## Estructura

```
src/
├── components/       # Header, Hero, WhatsAppFab, ServicesGrid, ServiceCard,
│                     # TrustPolicy, ProcessSteps, Footer,
│                     # ui/Button, ui/PlaceholderBox, ui/WhatsAppIcon
├── data/services.ts      # Catálogo + allowlist de service_id
├── lib/whatsapp.ts       # Constructor de deep links a wa.me
├── lib/wa-cta-client.ts  # Estados Loading/Error y guardas del FAB
├── layouts/BaseLayout.astro
├── pages/index.astro
└── styles/tokens.css, global.css
```

## Reglas duras

- Cero color literal fuera de la capa de primitivas de `src/styles/tokens.css`.
- Cero atributos `style=` con color en componentes.
- Contraste mínimo WCAG AA: 4.5:1 texto normal, 3:1 texto grande y bordes de control.
- Cero backend: sin `fetch`, XHR, webhooks, formularios ni base de datos.
- `service_id` solo puede venir de la allowlist en `src/data/services.ts`.
- Todo espaciado es múltiplo de 8 px (excepto bordes de 1/2/4 px).
- Todo control interactivo conserva su `data-testid`.

Detalle completo en [`AGENTS.md`](./AGENTS.md).

## Tareas de lanzamiento

Antes de publicar el dominio real hay que resolver estos puntos. **No los
borres de esta lista sin hacerlos.**

- [ ] **Quitar `<meta name="robots" content="noindex">`** de
      `src/layouts/BaseLayout.astro`. Está puesto a propósito para que el
      preview no se indexe; hay que retirarlo cuando el cliente apruebe.
- [ ] Cargar el número oficial de WhatsApp en la variable de entorno del hosting.
- [ ] Sustituir los placeholders de logo e imágenes por los assets reales (Andri).
- [ ] Agregar la imagen de vista previa social de 1200×630 y pasarla como
      `ogImage` a `BaseLayout`. Sin ella, `og:image` se omite a propósito.
- [ ] Reemplazar los enlaces legales del footer por el aviso de privacidad y los
      términos definitivos (Andri).
- [ ] Resolver la decisión de versión de Node (ver nota del stack).
