/**
 * Formato congelado del mensaje de WhatsApp (Fase 2.5 §3.4). Vive aca, en un
 * modulo PURO, para que lo usen los dos lados sin duplicarlo:
 *
 *   - el build (whatsapp.ts), que arma los enlaces fijos de la pagina;
 *   - el navegador (el medidor), que rearma el enlace cada vez que cambia la
 *     medida.
 *
 * Por eso este archivo no importa nada con efectos: ni settings.ts (que hace
 * fetch y top-level await) ni datos del build. Si importara algo de eso, el
 * medidor arrastraria el fetch al bundle del cliente.
 */

export type Placement = 'hero' | 'catalog' | 'fab' | 'trust';

/** service_id de la allowlist congelada (Fase 2.5 §3.5) mas 'general'. */
export type WaServiceId = 'gran-formato' | 'papeleria' | 'promocionales' | 'general';

/** E.164 sin "+": solo digitos, 10 a 15. */
export function isValidE164(numero: string): boolean {
  return /^[0-9]{10,15}$/.test(numero);
}

/**
 * Las tres lineas congeladas. La etiqueta puede llevar la medida del medidor
 * ("Lona de fachada, 3.00 m x 1.50 m"), pero la estructura no cambia: la
 * linea de Referencia es la que permite medir de donde vino cada cotizacion.
 */
export function buildWaMessage(
  serviceLabel: string,
  serviceId: WaServiceId,
  placement: Placement,
): string {
  return (
    `Hola, vengo del sitio de Imprenta Escalante.\n` +
    `Quiero cotizar: ${serviceLabel}.\n` +
    `Referencia: source=landing;service_id=${serviceId};placement=${placement}.`
  );
}

export function buildWaHref(numero: string, mensaje: string): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}
