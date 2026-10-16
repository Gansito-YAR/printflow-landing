/**
 * Catalogo 2026 de la imprenta. Fuente: el catalogo que el cliente aprobo,
 * con sus titulos, descripciones y textos alternativos ya redactados.
 *
 * Cada item lleva el ancho y alto REALES de su imagen. Eso es deliberado: las
 * 21 fotos tienen proporciones de 0.46 a 2.90, asi que una caja de relacion
 * fija recortaria casi todas. Con las medidas intrinsecas el navegador reserva
 * el espacio exacto, no hay recorte y no hay salto de layout.
 *
 * Las categorias NO son los service_id de services.ts. La allowlist de
 * service_id esta congelada en tres valores (Fase 2.5 seccion 3); aqui solo se
 * agrupa visualmente y cada categoria mapea a uno de esos tres para el CTA.
 */
import type { ServiceId } from './services';

import lonaConBastidorImg from '../assets/catalogo/lona-con-bastidor.jpg';
import lonaConBastidorTipoAImg from '../assets/catalogo/lona-con-bastidor-tipo-a.jpg';
import lonaTraslucidaConCorteVinilImg from '../assets/catalogo/lona-traslucida-con-corte-vinil.jpg';
import lonaTraslucidaImpresaImg from '../assets/catalogo/lona-traslucida-impresa.jpg';
import letrasDeAluminioImg from '../assets/catalogo/letras-de-aluminio.jpg';
import letrasDeAcrilicoImg from '../assets/catalogo/letras-de-acrilico.jpg';
import letrasLuminosasImg from '../assets/catalogo/letras-luminosas.jpg';
import vinilParaCristalesYVentanasImg from '../assets/catalogo/vinil-para-cristales-y-ventanas.jpg';
import vinilCorteRegistroYEtiquetasImg from '../assets/catalogo/vinil-corte-registro-y-etiquetas.jpg';
import vinilConTransferImg from '../assets/catalogo/vinil-con-transfer.jpg';
import vinilMontadoEnBaseRigidaImg from '../assets/catalogo/vinil-montado-en-base-rigida.jpg';
import volantesImg from '../assets/catalogo/volantes.jpg';
import recetariosYNotasImg from '../assets/catalogo/recetarios-y-notas.jpg';
import menusImg from '../assets/catalogo/menus.jpg';
import tarjetasDePresentacionImantadasYCarpeImg from '../assets/catalogo/tarjetas-de-presentacion-imantadas-y-carpe.jpg';
import barnizUvYLaminadoImg from '../assets/catalogo/barniz-uv-y-laminado.jpg';
import serigrafiaImg from '../assets/catalogo/serigrafia.jpg';
import grabadoLaserYBordadosImg from '../assets/catalogo/grabado-laser-y-bordados.jpg';
import calendariosImg from '../assets/catalogo/calendarios.jpg';
import agendasImg from '../assets/catalogo/agendas.jpg';
import standsYBanderinesImg from '../assets/catalogo/stands-y-banderines.jpg';

export type CategoriaId = 'exterior' | 'vinil' | 'impresion' | 'personalizados';

export interface Categoria {
  id: CategoriaId;
  titulo: string;
  resumen: string;
  /** service_id de la allowlist existente al que apunta el CTA de la categoria. */
  servicio: ServiceId;
}

export interface ItemCatalogo {
  id: string;
  categoria: CategoriaId;
  titulo: string;
  descripcion?: string;
  image: ImageMetadata;
  alt: string;
  /**
   * Tecnicas y acabados tal como los lista el catalogo 2026 del cliente.
   * Solo donde el catalogo los da: no se completan los que faltan.
   */
  tecnicas?: string;
  /** Medidas reales del archivo. No inventar ni redondear. */
  width: number;
  height: number;
}

export const CATEGORIAS: readonly Categoria[] = [
  {
    id: 'exterior',
    titulo: 'Publicidad exterior',
    resumen: 'Lonas, luminosos y letras en volumen para que te vean desde la calle.',
    servicio: 'gran-formato',
  },
  {
    id: 'vinil',
    titulo: 'Vinil y señalización',
    resumen: 'Del cristal del local a la etiqueta del producto.',
    servicio: 'gran-formato',
  },
  {
    id: 'impresion',
    titulo: 'Impresión comercial',
    resumen: 'Volantes, menús, tarjetas y papelería de uso diario.',
    servicio: 'papeleria',
  },
  {
    id: 'personalizados',
    titulo: 'Suvenirs y personalizados',
    resumen: 'Textil, calendarios, agendas y stands con tu marca.',
    servicio: 'promocionales',
  },
] as const;

export const CATALOGO: readonly ItemCatalogo[] = [
{
    id: 'lona-con-bastidor',
    categoria: 'exterior',
    titulo: 'Lona con bastidor',
    descripcion: 'Lonas publicitarias impresas, tensadas sobre estructura para fachadas y paredes.',
    image: lonaConBastidorImg,
    alt: 'Lona publicitaria amarilla con bastidor',
    width: 548,
    height: 402,
  },
  {
    id: 'lona-con-bastidor-tipo-a',
    categoria: 'exterior',
    titulo: 'Lona con bastidor tipo A',
    descripcion: 'Portátil, se mueve contigo y se coloca en segundos.',
    image: lonaConBastidorTipoAImg,
    alt: 'Lona con bastidor tipo A, verde',
    width: 459,
    height: 499,
  },
  {
    id: 'lona-traslucida-con-corte-vinil',
    categoria: 'exterior',
    titulo: 'Lona traslúcida con corte vinil',
    descripcion: 'Luminosos de bandera y de pared que se ven igual de bien de noche.',
    image: lonaTraslucidaConCorteVinilImg,
    alt: 'Anuncios luminosos de lona traslúcida con corte de vinil',
    width: 541,
    height: 1173,
  },
  {
    id: 'lona-traslucida-impresa',
    categoria: 'exterior',
    titulo: 'Lona traslúcida impresa',
    image: lonaTraslucidaImpresaImg,
    alt: 'Lona traslúcida impresa en caja de luz',
    width: 389,
    height: 792,
  },
  {
    id: 'letras-de-aluminio',
    categoria: 'exterior',
    titulo: 'Letras de aluminio',
    image: letrasDeAluminioImg,
    alt: 'Letras de aluminio con acabado cromado',
    width: 596,
    height: 444,
  },
  {
    id: 'letras-de-acrilico',
    categoria: 'exterior',
    titulo: 'Letras de acrílico',
    image: letrasDeAcrilicoImg,
    alt: 'Letras de acrílico de colores',
    width: 760,
    height: 282,
  },
  {
    id: 'letras-luminosas',
    categoria: 'exterior',
    titulo: 'Letras luminosas',
    descripcion: 'Tu logotipo en volumen, con luz propia para que destaque de noche.',
    image: letrasLuminosasImg,
    alt: 'Letras luminosas con logotipo',
    width: 760,
    height: 262,
  },
  {
    id: 'vinil-para-cristales-y-ventanas',
    tecnicas: 'Impreso · Transparente · Microperforado',
    categoria: 'vinil',
    titulo: 'Vinil para cristales y ventanas',
    image: vinilParaCristalesYVentanasImg,
    alt: 'Vinil impreso sobre cristales de un local comercial',
    width: 760,
    height: 703,
  },
  {
    id: 'vinil-corte-registro-y-etiquetas',
    tecnicas: 'Reflejante · Transparente',
    categoria: 'vinil',
    titulo: 'Vinil corte registro y etiquetas',
    descripcion: 'Stickers y etiquetas con la forma exacta de tu diseño.',
    image: vinilCorteRegistroYEtiquetasImg,
    alt: 'Etiquetas y stickers de vinil de corte en frascos, vasos y botellas',
    width: 760,
    height: 683,
  },
  {
    id: 'vinil-con-transfer',
    categoria: 'vinil',
    titulo: 'Vinil con transfer',
    image: vinilConTransferImg,
    alt: 'Aplicación de vinil con transfer sobre un cristal',
    width: 760,
    height: 298,
  },
  {
    id: 'vinil-montado-en-base-rigida',
    categoria: 'vinil',
    titulo: 'Vinil montado en base rígida',
    image: vinilMontadoEnBaseRigidaImg,
    alt: 'Letreros de seguridad y señalización impresos en base rígida',
    width: 760,
    height: 557,
  },
  {
    id: 'volantes',
    categoria: 'impresion',
    titulo: 'Volantes',
    descripcion: 'Impresión a color o blanco y negro.',
    image: volantesImg,
    alt: 'Volantes impresos a color',
    width: 389,
    height: 337,
  },
  {
    id: 'recetarios-y-notas',
    categoria: 'impresion',
    titulo: 'Recetarios y notas',
    descripcion: 'Recetarios en papel opalina y bond. Notas autocopiantes para tu negocio.',
    image: recetariosYNotasImg,
    alt: 'Recetarios y notas autocopiantes',
    width: 606,
    height: 535,
  },
  {
    id: 'menus',
    tecnicas: 'Enmicados · Barnizados · Laminados · Vinil impreso',
    categoria: 'impresion',
    titulo: 'Menús',
    image: menusImg,
    alt: 'Menús impresos para restaurantes',
    width: 760,
    height: 311,
  },
  {
    id: 'tarjetas-de-presentacion-imantadas-y-carpe',
    categoria: 'impresion',
    titulo: 'Tarjetas de presentación, imantadas y carpetas',
    image: tarjetasDePresentacionImantadasYCarpeImg,
    alt: 'Tarjeta de presentación y carpeta corporativa',
    width: 500,
    height: 430,
  },
  {
    id: 'barniz-uv-y-laminado',
    tecnicas: 'Mate · Brillante',
    categoria: 'impresion',
    titulo: 'Barniz UV y laminado',
    descripcion: 'Acabado mate o brillante para que tus tarjetas se sientan distintas.',
    image: barnizUvYLaminadoImg,
    alt: 'Tarjetas con barniz UV y laminado mate o brillante',
    width: 664,
    height: 681,
  },
  {
    id: 'serigrafia',
    tecnicas: 'Serigrafía · DTF · Bordados · Grabado láser',
    categoria: 'personalizados',
    titulo: 'Serigrafía',
    descripcion: 'Playeras, sudaderas, bolsas y gorras con tu diseño.',
    image: serigrafiaImg,
    alt: 'Playeras, gorras, bolsas y sudaderas estampadas',
    width: 760,
    height: 752,
  },
  {
    id: 'grabado-laser-y-bordados',
    tecnicas: 'Bordado · Grabado láser',
    categoria: 'personalizados',
    titulo: 'Grabado láser y bordados',
    image: grabadoLaserYBordadosImg,
    alt: 'Termo con grabado láser y gorra bordada',
    width: 760,
    height: 312,
  },
  {
    id: 'calendarios',
    categoria: 'personalizados',
    titulo: 'Calendarios',
    descripcion: 'De pared o de escritorio, con tu marca todo el año.',
    image: calendariosImg,
    alt: 'Calendarios de pared y de escritorio personalizados',
    width: 700,
    height: 251,
  },
  {
    id: 'agendas',
    categoria: 'personalizados',
    titulo: 'Agendas',
    image: agendasImg,
    alt: 'Agendas personalizadas',
    width: 622,
    height: 354,
  },
  {
    id: 'stands-y-banderines',
    tecnicas: 'Stands · Banderines',
    categoria: 'personalizados',
    titulo: 'Stands y banderines',
    image: standsYBanderinesImg,
    alt: 'Stand promocional y banderines publicitarios',
    width: 760,
    height: 747,
  },
] as const;
