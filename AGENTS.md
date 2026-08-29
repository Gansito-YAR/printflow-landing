# Contexto del proyecto — printflow-landing

## Qué es
Landing page pública de PrintFlow AI, sistema de la Imprenta Escalante.
Sitio 100% estático. Su única conversión es abrir WhatsApp con un mensaje prellenado.

## Stack
Astro + Tailwind CSS + TypeScript. Node 20. Deploy estático (Cloudflare Pages / Vercel).

## Fase actual: maquetado estructural SIN color
Estamos construyendo únicamente estructura y layout. La identidad visual llega después.

## Reglas duras — NUNCA las rompas
1. Sin backend. Prohibido fetch, XHR, Server Actions, webhooks, Supabase, cualquier request.
2. Sin base de datos, sin autenticación, sin formularios, sin captura de datos personales.
3. Cero color de marca. Todos los colores salen de variables en src/styles/tokens.css
   (escala de grises). Prohibido escribir un hex literal en un componente.
4. Sin fotografías reales ni iconografía propietaria. Solo cajas placeholder con label.
5. Sin Google Fonts. Solo system-ui.
6. Sin animaciones, parallax ni librerías de animación.
7. Todo espaciado es múltiplo de 8 px. Excepción: bordes de 1, 2 o 4 px.
8. Los enlaces a WhatsApp son <a href> reales. Deben funcionar con JavaScript desactivado.
9. El número de WhatsApp viene de import.meta.env.PUBLIC_WHATSAPP_E164. Nunca hardcodear
   un número. Si no está configurado, los CTA quedan Disabled y el FAB no se renderiza.
10. El service_id de un deep link solo puede venir de la allowlist en src/data/services.ts.
    Nunca insertar texto libre del DOM en una URL.
11. La landing nunca afirma que un pedido o cotización fue creado.
12. No inventar testimonios, sellos, certificaciones, precios ni clientes.
13. Todo control interactivo lleva un data-testid estable.
14. Accesibilidad: foco visible, orden de tabulación lógico, aria-label en el FAB,
    significado nunca dependiente solo del color.

## Grid
Desktop 1440: 12 columnas, márgenes 48px, gutter 24px, contenedor máx 1344px, header 72px.
Mobile 360: 4 columnas, márgenes 16px, gutter 16px, header 56px.
Ritmo entre secciones: 64-80px desktop, 48-64px mobile.

## Secciones
Header · Hero (+ FAB flotante de WhatsApp) · Catálogo de 3 servicios · Trust factors
(política de anticipo 50% + proceso de 3 pasos) · Footer.

## Formato del deep link
https://wa.me/<E164_SIN_MAS>?text=<MENSAJE_URL_ENCODED>
Mensaje:
  Hola, vengo del sitio de Imprenta Escalante.
  Quiero cotizar: [SERVICE_LABEL].
  Referencia: source=landing;service_id=[SERVICE_ID];placement=[hero|catalog|fab|trust].
