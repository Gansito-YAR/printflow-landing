export type ServiceId = 'gran-formato' | 'papeleria' | 'promocionales';

export interface Service {
  id: ServiceId;
  label: string;
  description: string;
}

// Allowlist estatica. Ningun service_id fuera de esta lista puede entrar a
// un enlace de WhatsApp (spec §9.1 y §9.3).
export const SERVICES: readonly Service[] = [
  {
    id: 'gran-formato',
    label: 'Gran formato',
    description: 'Lonas y viniles impresos en gran formato para exteriores e interiores.',
  },
  {
    id: 'papeleria',
    label: 'Papelería comercial',
    description: 'Tarjetas de presentación, flyers y folletos para tu negocio.',
  },
  {
    id: 'promocionales',
    label: 'Promocionales',
    description: 'Artículos publicitarios para menudeo y mayoreo con tu marca.',
  },
] as const;
