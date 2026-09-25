# Contexto del proyecto — printflow-landing

## Qué es
Landing page pública de PrintFlow AI, el sistema de la Imprenta Escalante.
Sitio 100% estático. Su única conversión es abrir WhatsApp con un mensaje prellenado.
Mitiga la pérdida del 20-30% de cotizaciones por respuesta lenta del dueño.

## Stack
Astro 7 + Tailwind CSS 4 + TypeScript. **Node 22** (decisión tomada en Fase 2.5:
Astro 7.2.2 declara engines.node >=22.12.0, así que Node 20 no es viable).
Deploy estático (Cloudflare Pages / Vercel) con redeploy automático.

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
5b. Hay MODO OSCURO, por `prefers-color-scheme` y sin interruptor. Vive en
   tokens.css y redefine SOLO la capa semántica: las primitivas no cambian, así
   que el naranja de marca es el mismo en los dos modos. Si agregas un token
   semántico nuevo, defínelo también en el bloque oscuro, y verifica AA en los
   dos modos, no en uno.

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

---

## Fase 2.5 — Cierre de Fase 2

Tres bloques secuenciales: 1) deploy y entorno, 2) jerarquía de CTA, 3) assets.
No saltarse el orden: reducir los CTA cambia el layout de tres secciones, y
hacerlo después de meter imágenes obliga a reacomodar dos veces.

## Decisiones tomadas
- Stack: Astro 7 con Node 22 (NO Node 20; Astro 7.2.2 exige >=22.12.0).
- El sitio se despliega en Cloudflare Pages o Vercel con redeploy automático.
- PUBLIC_WHATSAPP_E164 se queda VACÍA hasta que Andri entregue el número.
  El estado Disabled es el comportamiento correcto, no un bug.
- El meta robots noindex SE CONSERVA hasta que el cliente apruebe.
- Las tipografías están autohospedadas con @fontsource (subconjunto latin,
  solo Anton 400 y Barlow 400/600). No volver a cargarlas desde Google Fonts.

## Bloque 2 — CTA
La página debe quedar con 4 CTA de WhatsApp, no 7: hero, tres tarjetas y FAB.
El del header pasa a ser "Ver servicios" (ancla interna) o se le da tratamiento
secundario. El de trust se quita o cambia de mensaje para no ser redundante.
Ampliar el tipo Placement en src/lib/whatsapp.ts para incluir 'header' si el
CTA del header sobrevive como enlace a WhatsApp.
Nunca dos CTA con el mismo texto visibles al mismo tiempo.

## Bloque 3 — Assets
Los assets salen de la página de Facebook del cliente que indicó Isaías.
Se DESCARGAN a src/assets/. Prohibido enlazar, embeber o cargar cualquier cosa
desde Facebook, y prohibido incluir sus scripts o píxeles de seguimiento.
Se pueden editar y recortar; NUNCA deformar. Las tarjetas van en 4:3 con
object-fit: cover.
Todas las imágenes por astro:assets con <Image />, width y height explícitos.
Hero: eager + fetchpriority="high". El resto: lazy.
alt descriptivo y específico, nunca genérico.
Máximo 200 KB por imagen; página completa bajo 1 MB.
El logo debe funcionar sobre el header y el footer oscuros.
og:image de 1200x630 pasada como ogImage a BaseLayout.

## Verificación
Al cerrar cada bloque: abrir el sitio, recorrerlo y confirmar. Correr el prompt
de auditoría (Prompt_Auditoria_FARIDE.md) y adjuntar el reporte en el PR.
El contraste debe seguir en CERO fallos: el texto sobre imagen es donde más
se falla, así que hay que volver a medirlo después del Bloque 3.
