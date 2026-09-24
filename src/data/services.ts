import granFormatoImg from '../assets/gran-formato-microperforado.jpg';
import papeleriaImg from '../assets/papeleria-talonarios-folders.jpg';
import promocionalesImg from '../assets/promocionales-playera-termo.jpg';

export type ServiceId = 'gran-formato' | 'papeleria' | 'promocionales';

export interface Service {
  id: ServiceId;
  label: string;
  description: string;
  /**
   * Foto del servicio. Opcional: las categorias sin material utilizable
   * conservan la caja placeholder hasta que Andri entregue las fotos.
   */
  image?: ImageMetadata;
  /** Obligatorio cuando hay image. Descriptivo y especifico (§3.4.5). */
  imageAlt?: string;
}

// Allowlist estatica. Ningun service_id fuera de esta lista puede entrar a
// un enlace de WhatsApp (spec §9.1 y §9.3).
export const SERVICES: readonly Service[] = [
  {
    id: 'gran-formato',
    label: 'Gran formato',
    description: 'Lonas y viniles impresos en gran formato para exteriores e interiores.',
    image: granFormatoImg,
    imageAlt:
      'Detalle de un vinil microperforado impreso, sostenido a contraluz antes de instalarse',
  },
  {
    id: 'papeleria',
    label: 'Papelería comercial',
    description: 'Tarjetas de presentación, flyers y folletos para tu negocio.',
    image: papeleriaImg,
    imageAlt:
      'Talonarios de notas, folders tamaño carta y un folleto impresos, listos para entrega',
  },
  {
    id: 'promocionales',
    label: 'Promocionales',
    description: 'Artículos publicitarios para menudeo y mayoreo con tu marca.',
    image: promocionalesImg,
    imageAlt:
      'Playera y termo deportivo personalizados con el logotipo de Imprenta Escalante',
  },
] as const;
