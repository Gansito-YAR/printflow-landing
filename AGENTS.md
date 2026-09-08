# Contexto del proyecto — printflow-landing

## Qué es
Landing page pública de PrintFlow AI, el sistema de la Imprenta Escalante.
Sitio 100% estático. Su única conversión es abrir WhatsApp con un mensaje prellenado.
Mitiga la pérdida del 20-30% de cotizaciones por respuesta lenta del dueño.

## Stack
Astro + Tailwind CSS + TypeScript. Node 20. Deploy estático (Cloudflare Pages / Vercel).

## Fase actual: Fase 2 — identidad visual
La estructura ya está construida y aprobada. Esta fase agrega color de marca,
tipografía, fotografías reales e iconografía. El prototipo se presenta al cliente.

## LA ESTRUCTURA NO SE TOCA
No modificar: orden de secciones, grid de 8 puntos, alturas de header
(56px móvil / 72px escritorio), contenedor máximo de 1344px, las 9 reglas del FAB,
el formato de los deep links, la copy aprobada, ni los data-testid.
Si una decisión visual exige cambiar la estructura, detenerse y preguntar.

## Reglas duras — NUNCA las rompas

### Color
1. tokens.css tiene DOS capas: primitivas (--brand-*, --neutral-*) y semánticas
   (--surface-*, --ink-*, --border-*, --action-*). Los componentes usan SOLO
   tokens semánticos, y a través de clases de Tailwind.
2. Prohibido un hex, un rgb() o una primitiva --brand-* dentro de un componente.
3. Prohibido el atributo style= con color. Todo por clases de Tailwind mapeadas.
4. Contraste mínimo WCAG AA: 4.5:1 texto normal, 3:1 texto grande y bordes de control.
5. El color nunca es el único portador de significado. Los estados conservan su
   etiqueta textual y su tratamiento de borde.

### Imágenes
6. Todas las imágenes pasan por astro:assets con <Image />. Nunca <img> crudo
   desde public/.
7. width y height explícitos siempre, para no provocar CLS.
8. Hero: loading="eager" + fetchpriority="high". Todo lo demás: loading="lazy".
9. alt descriptivo y específico. Nunca alt="imagen".
10. Máximo 200 KB por imagen; página completa bajo 1 MB.
11. Las tarjetas de servicio conservan relación 4:3. Se recorta con object-fit,
    nunca se deforma ni se cambia el layout.

### Tipografía y movimiento
12. Fuentes con font-display: swap y stack de respaldo real. Solo los pesos usados.
13. Escala tipográfica tokenizada. El orden semántico h1 → h2 → h3 no cambia.
14. Transiciones de 150-250 ms solo en hover y focus. Prohibido parallax,
    scroll reveal y animaciones de entrada.
15. Respetar prefers-reduced-motion.

### Sin backend
16. Cero fetch, XHR, Server Actions, webhooks, Supabase o cualquier request.
17. Sin formularios, sin captura de datos personales, sin base de datos.
18. Los enlaces a WhatsApp son <a href> reales y deben funcionar con
    JavaScript desactivado.
19. El número sale de import.meta.env.PUBLIC_WHATSAPP_E164. Nunca hardcodear.
    Si no está configurado: CTA en estado Disabled y FAB sin renderizar.
20. El service_id solo puede venir de la allowlist en src/data/services.ts.
21. La landing nunca afirma que un pedido o cotización fue creado.
22. No inventar testimonios, sellos, certificaciones, precios ni clientes.

### Estructura de código
23. Un archivo, una responsabilidad. index.astro solo importa y ordena componentes.
24. NO aplicar Clean Architecture: este módulo no tiene lógica de negocio, estado
    ni backend. La separación correcta es components/ + lib/ + data/ + layouts/.
25. Todo control interactivo conserva su data-testid.

### Verificación
26. Al terminar cada etapa: abrir el resultado en el navegador, recorrerlo y
    confirmar que hace lo que debía. Si algo quedó mal, incompleto o inesperado,
    corregirlo en ese momento, no dejarlo como pendiente.
27. Nunca entregar la carpeta dist/. Siempre el repositorio con un Pull Request.
