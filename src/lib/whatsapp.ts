import type { ServiceId } from '../data/services';
import { SETTINGS } from './settings';

export type Placement = 'hero' | 'catalog' | 'fab' | 'trust';

/* El numero sale del panel administrativo, leido en el build (ver settings.ts).
   Cuando no hay panel configurado, settings.ts cae a PUBLIC_WHATSAPP_E164, asi
   que el contrato anterior sigue valiendo tal cual en local y en CI. */
const WHATSAPP_E164 = SETTINGS.whatsappE164;

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
