import type { ServiceId } from '../data/services';
import { SETTINGS } from './settings';
import { buildWaHref, buildWaMessage, isValidE164, type Placement } from './wa-message';

export type { Placement };

/* El numero sale del panel administrativo, leido en el build (ver settings.ts).
   Cuando no hay panel configurado, settings.ts cae a PUBLIC_WHATSAPP_E164, asi
   que el contrato anterior sigue valiendo tal cual en local y en CI. */
const WHATSAPP_E164 = SETTINGS.whatsappE164;

/**
 * Valida el numero que entrega el panel administrativo (ver settings.ts).
 * Formato E.164 sin "+": solo digitos, 10 a 15 caracteres.
 */
export function isWhatsappConfigured(): boolean {
  return isValidE164(WHATSAPP_E164);
}

/** El numero, para los componentes que rearman el enlace en el navegador. */
export function whatsappNumber(): string | null {
  return isWhatsappConfigured() ? WHATSAPP_E164 : null;
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
  return buildWaHref(WHATSAPP_E164, buildWaMessage(serviceLabel, serviceId, placement));
}
