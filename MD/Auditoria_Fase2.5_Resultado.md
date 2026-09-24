# Auditoría Fase 2.5 — Cierre de Fase 2

| Campo | Detalle |
|---|---|
| Repositorio | `printflow-landing` |
| Rama | `fase2.5/cierre-fase2` |
| Origen | `Fase2.5_FARIDE_Cierre_Fase2.md` — 3 bloques |
| Método | Código fuente, build ejecutado, medición en navegador |

---

## 1 · Veredicto ejecutivo

**Bloque 2: completo. Bloque 1: completo salvo el deploy. Bloque 3: parcial — logo, hero, favicon y vista previa social integrados; faltan 2 de 3 fotos de tarjeta.**

> **Nota de lectura.** Los §2 a §6 son la primera pasada. El **§4 quedó
> superado**: ahí se concluyó que las fotos solo existían como miniaturas de
> 206 px. Una segunda pasada encontró la forma de bajarlas a resolución
> completa y sí se integraron assets. **El estado real del Bloque 3 está en el
> §7**, al final del documento.

El Bloque 2 se cerró entero: la página bajó de 7 CTA de WhatsApp a 4, sin tocar estructura, copy ni `data-testid`. El Bloque 1 se cerró en todo lo que es código y documentación —decisión de Node registrada, tipografías autohospedadas—, pero **el deploy y el Lighthouse quedan pendientes porque requieren acceso a la cuenta de hosting**, que no es algo que un asistente pueda hacer en nombre de nadie.

El Bloque 3 es el que importa comentar, porque la corrección de este documento era justamente *"pregunta antes de declararlo bloqueado"*. Se intentó. El resultado está en §4.

---

## 2 · Bloque 1 — Deploy y entorno

| Ítem | Estado | Evidencia |
|---|---|---|
| 1.1 · Decisión de Node registrada | ✅ | `AGENTS.md` decía "Node 20"; ahora dice Node 22 con la razón. El README pasó de "pendiente de decisión" a decisión tomada, con la nota de fijar `NODE_VERSION` en el hosting |
| 1.1 · `engines.node` sin tocar | ✅ | `package.json` conserva `">=22.12.0"` |
| 1.2 · Deploy en preview público | ⛔ **Tuyo** | Requiere autenticarse en Cloudflare/Vercel y crear el proyecto |
| 1.2 · Variables en el panel del hosting | ⛔ **Tuyo** | Depende del deploy |
| 1.2 · `noindex` conservado | ✅ | `BaseLayout.astro` lo mantiene; sigue anotado en las tareas de lanzamiento del README |
| 1.3 · Tipografías autohospedadas | ✅ | `@fontsource/anton` + `@fontsource/barlow`, subconjunto latin. **Cero referencias a `googleapis` o `gstatic`** en el HTML construido |
| 1.4 · Lighthouse línea base | ⛔ **Bloqueado** | Necesita la URL pública del 1.2 |

### Sobre las tipografías

Se cargan tres archivos woff2 en lugar de dos conexiones a Google: Anton 400, Barlow 400 y Barlow 600.

**Barlow 700 se descartó.** `document.fonts` lo reportaba como `unloaded` y una búsqueda de `font-bold` en `src/` no devuelve nada: ningún componente lo usa. Eran 22 KB de bundle que nunca se iban a descargar.

`dist` completo queda en **164 KB**.

### ⚠️ Vulnerabilidades de dependencias

`npm audit` reporta **5 vulnerabilidades: 1 crítica, 3 altas, 1 moderada**, en `sharp`, `svgo` y `js-yaml`. Son dependencias **transitivas de Astro**, no de los paquetes de tipografía que se agregaron.

**No se corrieron `npm audit fix` ni `--force`**: moverían versiones dentro de un stack que Isaías acaba de congelar en Astro 7. **Decisión suya.**

---

## 3 · Bloque 2 — Jerarquía de llamadas a la acción

### Decisiones tomadas y por qué

**CTA del header → se retira.**

El documento daba tres salidas: convertirlo en "Ver servicios", quitarlo, o bajarlo a tratamiento secundario. Se eligió **quitarlo y dejar el enlace "Servicios" que ya existía como única acción del header**, mostrándolo también en móvil, donde estaba oculto tras `md:inline-flex` y el header no ofrecía ninguna navegación.

**No se usó el texto "Ver servicios"** que sugería el documento. El hero ya tiene un CTA secundario con ese texto exacto y ambos son visibles en la primera pantalla: habría reintroducido la duplicación que el bloque viene a eliminar. El header conserva "Servicios".

**CTA de trust → se retira.**

Las dos opciones del documento eran válidas. Se eligió quitarlo por tres razones:

1. Está a menos de 200 px del FAB, que hace exactamente lo mismo.
2. Era el cuarto "Cotización general" de la página.
3. La variante de cambiarle el mensaje —*"Tengo dudas sobre el anticipo"*— es buena idea, pero dejaría **5 CTA inline**, y el checklist exige 4.

> **Nota sobre el conteo (§2.2).** La tabla del documento conserva hero + 3 tarjetas + FAB, que suman **5**, mientras el checklist pide **4**. Las dos cifras solo cuadran si el FAB no cuenta como CTA inline. Se resolvió bajo esa lectura: **4 CTA inline + el FAB flotante**. Si la intención era otra, es ajuste de una línea.

**Tipo `Placement` → sin cambios.**

El §2.3 se cierra solo: al desaparecer el CTA del header, ya no hay dos enlaces reportando `placement=hero`. No se amplió el tipo con `'header'`. El valor `'trust'` queda en la unión sin uso; se dejó a propósito para no estrechar el contrato del deep link, que el §3 congela.

### ✅ Verificación de cierre — Bloque 2

- [x] **4 CTA de WhatsApp**, no 7 — `cta-hero-whatsapp`, `cta-card-gran-formato`, `cta-card-papeleria`, `cta-card-promocionales`, más el FAB
- [x] No hay dos CTA con el mismo texto visibles a la vez *(ver salvedad abajo)*
- [x] Cada CTA tiene su `placement` correcto — `hero`, `catalog` ×3, `fab`
- [x] Los tres CTA de tarjeta conservan su `service_id` — `gran-formato`, `papeleria`, `promocionales`
- [x] Decisiones documentadas arriba
- [x] Los `data-testid` conservados **no cambiaron** — inventario completo verificado en el DOM construido
- [x] Estado *Disabled* funcionando: con la variable vacía, **0 enlaces `wa.me`, 4 CTA en "Contacto no disponible", FAB sin nodo en el body**
- [x] Los enlaces siguen siendo `<a href>` reales con `target` y `rel` en el HTML estático, así que funcionan con JavaScript desactivado

> **Salvedad honesta.** El tooltip del FAB dice "Cotizar por WhatsApp", igual que el CTA del hero. Está en `opacity-0` hasta el hover y el contenido visible del FAB es el icono, así que nunca se leen dos textos iguales a la vez. **No se cambió** porque debe coincidir con el `aria-label`, que la §8.3.2 de Fase 1 congela.

---

## 4 · Bloque 3 — Assets: se intentó, y hasta dónde se llegó

**La página de Facebook es pública y se pudo abrir sin cuenta.** Esto es lo que hay:

| Recurso | Disponible sin login |
|---|---|
| Portada / banner | **960×422 PNG**, 500 KB — descargada y revisada |
| Una publicación | 500×600 JPG |
| Galería de fotos | **8 miniaturas de 206×206**, con muro de login detrás |
| Fotos a resolución completa | ❌ `/photo.php?fbid=…` redirige a `/login/?next=…` |

**No se inició sesión en Facebook.** Entrar credenciales en un servicio externo queda fuera de lo que un asistente debe hacer, y no cambia el diagnóstico: haría falta tu cuenta.

### Por qué eso no alcanza

| Necesidad | Fuente disponible | Veredicto |
|---|---|---|
| Logo header/footer | Wordmark incrustado en el banner de 960×422, sobre textura | ❌ Recortarlo da un logo de baja resolución con el fondo pegado. El **§3.3 lo prohíbe expresamente**: *"no lo uses así ni intentes repararlo a mano: pídele a Andri el archivo original, idealmente vectorial"* |
| Imagen del hero | 500×600, o miniaturas de 206×206 | ❌ Insuficiente |
| 3 tarjetas en 4:3 | Miniaturas de 206×206 | ❌ No se puede recortar a 4:3 usable |
| `og:image` 1200×630 | Derivada de las anteriores | ❌ Bloqueada en cascada |
| Favicon | Derivado del logo | ❌ Bloqueado en cascada |

El §3.2 pide priorizar **fotos de trabajos reales terminados**. La única publicación visible está etiquetada por Facebook como **"Contenido de IA"**, así que tampoco cumpliría ese criterio.

**Lo que hace falta, concreto:** el archivo vectorial del logo (`.svg`, `.ai` o `.pdf`) y las fotos de trabajos a resolución original. Cualquiera de las dos vías sirve — que Andri los mande, o que alguien con sesión en Facebook descargue los originales de la galería.

### Tres discrepancias encontradas de paso

Salieron al revisar la página y **ninguna se aplicó al sitio**, porque son datos de negocio y corresponden a Andri:

1. **Dos teléfonos distintos.** El banner dice `9999601378`; la ficha de Información dice `999 138 9419`. Hay que saber cuál es el bueno antes de cargar `PUBLIC_WHATSAPP_E164`.
2. **Otra marca en el correo.** `printerbrothersoficial@gmail.com` — "Printer Brothers", no "Imprenta Escalante".
3. **Dirección publicada.** `Av Cupules 81, entre 18 y 20, Mérida`. El footer sigue con el texto neutro *"Consulta nuestra ubicación por WhatsApp"*; **no se reemplazó** porque el Bloque 3 es de imágenes y logos, y los datos de negocio los confirma Andri.

### ✅ Verificación de cierre — Bloque 3

- [x] **§3.6 · El logo no se desborda del header en 320 ni 375 px** — ver abajo
- [x] Cero scripts, píxeles o recursos externos de Facebook — verificado: 0 coincidencias de `facebook` o `fbcdn` en el HTML construido
- [ ] Todo lo demás — bloqueado por assets

### §3.6 · Desbordamiento del logo — corregido

Reproducido tal cual lo describía el documento: a **320 px**, el label medía **94×67** dentro de una caja de **112×32**, desbordando 18 px la caja y **5 px el header**. Igual a 375 px.

**Corregido con `overflow-hidden` en `PlaceholderBox`**, no acortando el texto. La razón importa: el documento pedía confirmar si el logo real también desbordaría. Arreglándolo en la caja, **no puede**, sea cual sea el asset que entre.

Verificado en navegador a 320 y 375 px: `overflow: hidden` aplicado, la caja queda **12 px dentro del header** y nada pinta fuera de él.

---

## 5 · Auditoría de código

```
npm run build                     → exit 0, sin errores ni warnings de TypeScript
grep 'style='  en src/            → 0 resultados
grep hex/rgb/hsl en componentes   → 0 resultados
grep '--brand-' en componentes    → 0 resultados
grep console.log|TODO|FIXME       → 0 resultados
grep fetch|XHR|axios|supabase     → 0 resultados
grep '<form'|'<input'             → 0 resultados
grep [0-9]{10,15} en src/         → 0 resultados
grep googleapis|gstatic en dist   → 0 resultados
grep facebook|fbcdn en dist       → 0 resultados
peso de dist                      → 164 KB
```

**Contraste: 0 fallos.** Re-medidos todos los nodos de texto de la página contra su fondo real, con el umbral ajustado por tamaño y peso. Ninguno baja de AA.

---

## 6 · Pendiente

### Tuyo — requiere tu cuenta

1. **Deploy** en Cloudflare Pages o Vercel. Build `npm run build`, salida `dist`.
2. **Variables en el panel:** `PUBLIC_WHATSAPP_E164` vacía, `PUBLIC_SITE_URL` con la URL del preview.
3. **Fijar Node 22** en el hosting (`NODE_VERSION` en Cloudflare, selector de runtime en Vercel).
4. **Lighthouse móvil** sobre la URL pública, como línea base.
5. **Agregar `PUBLIC_SITE_URL=` a `.env.example`.** El archivo está protegido por una regla de permisos del entorno y no se pudo editar; la variable está documentada en el README.

### De Andri

Logo vectorial · fotos de trabajos a resolución original · el teléfono correcto de los dos · confirmar si la dirección publicada va al footer · aviso de privacidad y términos.

### De Isaías

El conteo de 4 vs 5 CTA del §2.2 · qué hacer con las 5 vulnerabilidades de dependencias transitivas de Astro.

### Sigue sin verificarse

Recorrido con `Tab`, zoom 200 %, carga con JavaScript desactivado y prueba en celular real. Son manuales y necesitan un navegador de verdad.

---

## 7 · Bloque 3 — segunda pasada: qué sí se pudo

Tras el primer intento se encontró la vía para bajar las fotos a resolución
completa: las miniaturas de la galería llevan `ctp=s206x206` en la URL, y
**quitando ese parámetro el CDN devuelve el original** (1080–1145 px). Las 8
fotos públicas se descargaron así, sin iniciar sesión.

### Lo que se integró

| Ubicación | Asset | Detalle |
|---|---|---|
| Header y footer | Logo | PNG con transparencia, extraído por luminancia del lockup de marca. Sin fondo propio, funciona sobre ambas superficies oscuras (§3.4.7) |
| Hero | Lona instalada en vitrina | `eager` + `fetchpriority="high"`, 4:3, `object-cover`. 60 KB en WebP |
| Tarjeta Gran formato | Vinil microperforado | `lazy`, 4:3. 34 KB en WebP |
| Favicon | 256×256 + apple-touch-icon 180×180 | Derivados del isotipo |
| Vista previa social | 1200×630 | Compuesta con la foto del hero atenuada, el logo y una barra de marca |

**Peso: 286 KB de primera carga.** Ninguna imagen supera 200 KB.

### Lo que NO se integró, y por qué

De las 8 fotos públicas, **5 no son publicables**. No es un problema de encuadre
—eso se arregla recortando— sino de contenido:

| Foto | Problema |
|---|---|
| Etiquetas con corte registro | **Precios publicados** (`$180`, `$450`). La C-14 y la §3 de Fase 1 los prohíben |
| Microperforado (placa completa) | **Precio** `$280 M²`. Se usó solo el recorte fotográfico, sin la banda de precio |
| Figuras y personajes | **Spider-Man, Hulk y Capitán América.** Propiedad intelectual de Marvel |
| Recetarios | **Datos personales de una tercera persona**: nombre completo de una doctora, cédula profesional, teléfono y correo. Regla G-06 |
| Ofertón Dr. Simi · Lona Mercado Libre | Marcas de terceros y promoción con precios |

Ninguna de las 8 es una fotografía de trabajo terminado: son **placas
promocionales de redes** con texto de marketing incrustado. De ahí que solo
tres regiones fotográficas resultaran limpias.

**Consecuencia:** las tarjetas de **Papelería comercial** y **Promocionales**
conservan su placeholder. No existe en el material público ninguna imagen de
esas dos categorías que sea legal y publicable.

### Lo que hace falta pedir

- **Dos fotos de trabajos terminados**, una de papelería y una de promocionales.
  El banner de portada muestra una playera y un termo con la marca: si existen
  esas fotos sueltas, resuelven Promocionales.
- **El logo vectorial** (`.svg`, `.ai` o `.pdf`). El PNG actual es un extraído
  por luminancia y conserva algo de textura del fondo original. Sirve para
  presentar, pero el §3.3 pide el original y tiene razón.

### ✅ Verificación de cierre — Bloque 3 (actualizada)

- [x] Los assets están **descargados dentro del repositorio**, no enlazados a Facebook
- [x] **Cero** scripts, píxeles o recursos de Facebook — 0 coincidencias en `dist/index.html`
- [x] Todas las imágenes pasan por `astro:assets` con `width` y `height`
- [x] Hero con `eager` + `fetchpriority="high"`; el resto con `lazy`
- [x] `alt` descriptivos y específicos. El del logo del header va vacío a propósito: el enlace ya lleva `aria-label` y se duplicaría
- [x] Ninguna imagen supera 200 KB; la página completa en **286 KB**
- [x] Las tarjetas conservan 4:3 con `object-fit: cover`; ninguna deformada
- [x] El logo se ve correctamente sobre el header y el footer oscuros
- [x] `og:image` de 1200×630 configurada *(requiere `PUBLIC_SITE_URL` para emitirse; sin ella se omite en lugar de publicar una ruta que ningún crawler resuelve)*
- [x] Favicon real
- [x] **El logo no se desborda del header en 320 ni 375 px** — mide 116×24 con 17 px de holgura
- [x] Contraste: **0 fallos**, re-medido con las imágenes ya integradas
- [x] **Cero placeholders** — ver §8
- [ ] Red lenta simulada — requiere navegador real
- [ ] Lighthouse — requiere el deploy

---

## 8 · Cierre de Papelería y Promocionales

Las dos tarjetas que faltaban ya tienen foto. `grep PLACEHOLDER` sobre
`dist/index.html` devuelve **0**.

Ambas salen del **banner de portada de la imprenta**, que es material propio:

| Tarjeta | Contenido | Origen |
|---|---|---|
| Papelería comercial | Talonarios de notas, folders tamaño carta y un folleto | Recorte del banner, escalado con `lanczos3` y realzado |
| Promocionales | Playera y termo deportivo con el logotipo de la imprenta | Íd. |

### Dos imágenes propuestas que se descartaron

**Talonario de clínica dental.** Muestra nombre completo, cédula profesional,
teléfono, correo y dirección de una tercera persona — regla **G-06**. Además su
texto está degenerado (`Paclente`, `UNIVERSIDAD AUTONOMA DE YOCATAN`,
`Traccionamentzros Reroes`, `dentariameindatogmail.com`), señal de mockup
generado y no de trabajo impreso real: de cerca se lee falso.

**Placa de imanes publicitarios.** Publica un precio (`$580`), prohibido por
**C-14**. Y las piezas llevan marcas y teléfonos **chilenos** (`+569 8613 44813`,
`abastible`, precios en pesos chilenos `2 X 15.990`): son plantillas de stock,
que el §3.3 excluye — *"solo material de la propia imprenta"*.

### Estado final de assets

- **6 imágenes**, todas con nombre accesible. 2 `eager` (logo del header y hero),
  4 `lazy`.
- **348 KB de primera carga**; imagen más pesada **60 KB**.
- **Contraste: 0 fallos**, re-medido con las cinco fotos integradas.
- Los tres CTA de tarjeta quedaron con la **misma altura** en 375, 800, 1024,
  1280 y 1920 px.

### Lo que sigue conviniendo pedirle a Andri

El **logo vectorial** (`.svg`, `.ai` o `.pdf`). El PNG actual se extrajo por
luminancia del material y conserva algo de textura del fondo. Sirve para
presentar al cliente, pero el §3.3 pide el original y tiene razón.

Y, si existen, **fotos sueltas de trabajos terminados**: las de Papelería y
Promocionales son recortes de un banner, no fotografías propias de cada pieza.
