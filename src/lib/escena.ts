/**
 * Geometria del medidor a escala. Modulo PURO: lo corren el build (que dibuja
 * la escena inicial en el HTML) y el navegador (que la redibuja al mover la
 * medida). Asi la escena existe aunque el JavaScript no corra, que es lo que
 * exige AGENTS 18: en el boceto la escena se dibujaba solo con JS y sin el
 * quedaba un SVG vacio.
 *
 * Los colores NO estan aca: cada nodo lleva una clase y el color sale de los
 * tokens (--viz-*) en el componente. Este archivo no conoce la paleta.
 */

import type { WaServiceId } from './wa-message';

export type TipoPieza = 'muro' | 'mano';

export interface Producto {
  id: string;
  nom: string;
  /** service_id de la allowlist congelada al que va la cotizacion. */
  servicio: Exclude<WaServiceId, 'general'>;
  tipo: TipoPieza;
  /** Rango arrastrable, en cm. Ausente cuando la medida es fija. */
  min?: number;
  max?: number;
  def?: number;
  /** Alto como fraccion del ancho, para las piezas de medida libre. */
  rel?: number;
  /** Medida fija [ancho, alto] en cm: formatos de papel del catalogo 2026. */
  fijo?: readonly [number, number];
}

/*
 * Los rangos y proporciones de lona, vinil y letrero son una referencia
 * visual, no una ficha tecnica: el catalogo no da medidas maximas. Las de
 * Carta, Oficio y Tabloide si son exactas y salen del catalogo 2026.
 */
export const PRODUCTOS: readonly Producto[] = [
  { id: 'lona', nom: 'Lona de fachada', servicio: 'gran-formato', tipo: 'muro', min: 100, max: 600, def: 300, rel: 0.5 },
  { id: 'vitrina', nom: 'Vinil de vitrina', servicio: 'gran-formato', tipo: 'muro', min: 50, max: 300, def: 120, rel: 0.8 },
  { id: 'letrero', nom: 'Letrero luminoso', servicio: 'gran-formato', tipo: 'muro', min: 60, max: 400, def: 180, rel: 0.3 },
  { id: 'playera', nom: 'Playera impresa', servicio: 'promocionales', tipo: 'mano', min: 20, max: 40, def: 28, rel: 1.2 },
  { id: 'carta', nom: 'Carta', servicio: 'papeleria', tipo: 'mano', fijo: [21.6, 27.9] },
  { id: 'oficio', nom: 'Oficio', servicio: 'papeleria', tipo: 'mano', fijo: [21.6, 33] },
  { id: 'tabloide', nom: 'Tabloide', servicio: 'papeleria', tipo: 'mano', fijo: [27.9, 43.2] },
  { id: 'tarjeta', nom: 'Tarjeta de presentación', servicio: 'papeleria', tipo: 'mano', min: 8, max: 12, def: 9, rel: 0.55 },
];

export const PERSONA_CM = 170;
export const ESCENA_W = 1000;
export const ESCENA_H = 560;

export function anchoInicial(p: Producto): number {
  return p.fijo ? p.fijo[0] : (p.def ?? 100);
}

export function altoDe(p: Producto, anchoCm: number): number {
  return p.fijo ? p.fijo[1] : anchoCm * (p.rel ?? 1);
}

/** 300 → "3.00 m"; 28 → "28 cm"; 21.6 → "21.6 cm". */
export function fmt(cm: number): string {
  if (cm >= 100) return `${(cm / 100).toFixed(2)} m`;
  return Number.isInteger(cm) ? `${cm} cm` : `${cm.toFixed(1)} cm`;
}

/** Lo que va en la linea "Quiero cotizar:" del mensaje congelado. */
export function etiquetaCotizacion(p: Producto, anchoCm: number): string {
  return `${p.nom}, ${fmt(anchoCm)} de ancho por ${fmt(altoDe(p, anchoCm))} de alto`;
}

export interface Nodo {
  tag: 'line' | 'rect' | 'circle' | 'path' | 'text';
  clase: string;
  attrs: Record<string, string | number>;
  texto?: string;
}

const r = (n: number): number => Math.round(n * 10) / 10;

/*
 * Proporciones de la silueta, como fraccion del alto total. Tienen que sumar
 * exactamente 1: cabeza + hombros (0.299) + torso (0.342) + piernas (0.359).
 *
 * El trazo del boceto bajaba 0.42 de torso y 0.44 de piernas: la figura medía
 * 1.16 veces lo que debia, unos 197 cm, y los pies quedaban 55px bajo la
 * linea del suelo, recortados por el borde del dibujo. En una herramienta
 * cuya promesa es "comparalo contra una persona de 1.70 m", eso hacia ver
 * cada pieza un 14% mas chica de lo que es.
 */
const CABEZA = 0.13; // radio de la cabeza
const HOMBROS = CABEZA * 2.3; // de la coronilla a los hombros: 0.299
const TORSO = 0.342;
const PIERNAS = 1 - HOMBROS - TORSO; // 0.359
const ENTREPIERNA = PIERNAS * 0.68; // alto del hueco entre las piernas

/** Media anchura de la figura a la altura de la cadera, en px. */
const medioAncho = (h: number): number => h * CABEZA * 1.6;

function silueta(x: number, suelo: number, escala: number): Nodo[] {
  const h = PERSONA_CM * escala;
  const cab = h * CABEZA;
  const d =
    `M${r(x - cab * 1.15)} ${r(suelo - h + h * HOMBROS)}` +
    ` q${r(cab * 1.15)} ${r(-cab * 0.5)} ${r(cab * 2.3)} 0` +
    ` l${r(cab * 0.45)} ${r(h * TORSO)} l${r(-cab * 0.72)} 0` +
    ` l${r(-cab * 0.1)} ${r(h * PIERNAS)} l${r(-cab * 0.62)} 0` +
    ` l${r(-cab * 0.28)} ${r(-h * ENTREPIERNA)} l${r(-cab * 0.28)} ${r(h * ENTREPIERNA)}` +
    ` l${r(-cab * 0.62)} 0 l${r(-cab * 0.1)} ${r(-h * PIERNAS)}` +
    ` l${r(-cab * 0.72)} 0 Z`;
  return [
    { tag: 'circle', clase: 'viz-silueta', attrs: { cx: r(x), cy: r(suelo - h + cab), r: r(cab) } },
    { tag: 'path', clase: 'viz-silueta', attrs: { d } },
  ];
}

/** Todos los nodos de la escena, en orden de pintado. */
export function escena(p: Producto, anchoCm: number): Nodo[] {
  const altoCm = altoDe(p, anchoCm);
  const masAlto = Math.max(PERSONA_CM, altoCm) * 1.35;
  /* La escala la pone lo que mas aprieta: el alto o el ancho. Solo con el
     alto, un letrero de 4 m (bajo y muy ancho) no cabia y se montaba sobre la
     persona. 80 cm es lo que ocupan la figura y el aire hasta la pieza. */
  const escala = Math.min((ESCENA_H * 0.84) / masAlto, (ESCENA_W - 200) / (anchoCm + 80));
  const suelo = ESCENA_H - 46;

  const anchoPx = anchoCm * escala;
  const altoPx = altoCm * escala;
  const personaX = ESCENA_W * 0.14;
  /* La pieza nunca empieza antes del borde de la figura mas un respiro. */
  const piezaX = Math.max(personaX + medioAncho(PERSONA_CM * escala) + 36, ESCENA_W * 0.56 - anchoPx / 2);
  const piezaY =
    p.tipo === 'mano' ? suelo - PERSONA_CM * escala * 0.62 - altoPx / 2 : suelo - altoPx - 10;
  const cotaY = piezaY - 18;

  return [
    { tag: 'line', clase: 'viz-suelo', attrs: { x1: 0, y1: suelo, x2: ESCENA_W, y2: suelo } },
    {
      tag: 'rect',
      clase: 'viz-pieza',
      attrs: { x: r(piezaX), y: r(piezaY), width: r(Math.max(anchoPx, 3)), height: r(Math.max(altoPx, 3)), rx: 3 },
    },
    ...silueta(personaX, suelo, escala),
    { tag: 'line', clase: 'viz-cota', attrs: { x1: r(piezaX), y1: r(cotaY), x2: r(piezaX + anchoPx), y2: r(cotaY) } },
    { tag: 'line', clase: 'viz-cota', attrs: { x1: r(piezaX), y1: r(cotaY - 6), x2: r(piezaX), y2: r(cotaY + 6) } },
    {
      tag: 'line',
      clase: 'viz-cota',
      attrs: { x1: r(piezaX + anchoPx), y1: r(cotaY - 6), x2: r(piezaX + anchoPx), y2: r(cotaY + 6) },
    },
    {
      tag: 'text',
      clase: 'viz-cota-txt',
      attrs: { x: r(piezaX + anchoPx / 2), y: r(cotaY - 10), 'text-anchor': 'middle' },
      texto: fmt(anchoCm),
    },
    {
      tag: 'text',
      clase: 'viz-ref-txt',
      attrs: { x: r(personaX), y: suelo + 26, 'text-anchor': 'middle' },
      texto: '1.70 m',
    },
  ];
}
