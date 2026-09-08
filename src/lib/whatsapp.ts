import type { ServiceId } from '../data/services';

export type Placement = 'hero' | 'catalog' | 'fab' | 'trust';

const WHATSAPP_E164 = import.meta.env.PUBLIC_WHATSAPP_E164 ?? '';

/**
 * Valida el numero configurado en PUBLIC_WHATSAPP_E164.
 * Formato E.164 sin "+": solo digitos, 10 a 15 caracteres.
 */
export function isWhatsappConfigured(): boolean {
  return /^[0-9]{10,15}$/.test(WHATSAPP_E164);
}

/**
 * Construye el deep link a wa.me con un mensaje breve y determinista.
 * Devuelve null si el numero no esta configurado (estado Disabled).
 *
 * Regla dura: service_id solo puede venir de la allowlist en
 * src/data/services.ts. Nunca insertar texto libre del DOM en la URL.
 */
export function buildWhatsappHref(
  serviceLabel: string,
  serviceId: ServiceId | 'general',
  placement: Placement,
): string | null {
  if (!isWhatsappConfigured()) return null;

  const message =
    `Hola, vengo del sitio de Imprenta Escalante.\n` +
    `Quiero cotizar: ${serviceLabel}.\n` +
    `Referencia: source=landing;service_id=${serviceId};placement=${placement}.`;

  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(message)}`;
}
