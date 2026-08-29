# printflow-landing

Landing page pública de **PrintFlow AI** (Imprenta Escalante). Fase 1:
maquetado estructural, 100% estático, en escala de grises. La única
conversión del sitio es un deep link a WhatsApp (`<a href>`, sin backend).

Ver la especificación completa en [`MD/Fase1_FARIDE_Landing_UI.md`](./MD/Fase1_FARIDE_Landing_UI.md)
y las reglas duras del proyecto en [`AGENTS.md`](./AGENTS.md).

## Stack

Astro + Tailwind CSS (v4) + TypeScript estricto. Node 20 LTS. npm.

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
código de país, sin `+`) cuando el número oficial esté disponible. Mientras
esté vacío, todos los CTA quedan en estado *Disabled* y el FAB de WhatsApp no
se renderiza — es el comportamiento esperado, no un bug.

```bash
cp .env.example .env
```

## Estructura

```
src/
├── components/       # Header, Hero, WhatsAppFab, ServicesGrid, ServiceCard,
│                      # TrustPolicy, ProcessSteps, Footer, ui/Button, ui/PlaceholderBox
├── data/services.ts   # Catálogo + allowlist de service_id
├── lib/whatsapp.ts    # Constructor de deep links a wa.me
├── layouts/BaseLayout.astro
├── pages/index.astro
└── styles/tokens.css, global.css
```

## Reglas duras

- Escala de grises únicamente: cero color literal fuera de `src/styles/tokens.css`.
- Cero backend: los enlaces de WhatsApp son `<a href>` reales, funcionan con
  JavaScript desactivado.
- `service_id` solo puede venir de la allowlist en `src/data/services.ts`.
- Todo espaciado es múltiplo de 8px (excepto bordes de 1/2/4px).

Detalle completo en `AGENTS.md`.
