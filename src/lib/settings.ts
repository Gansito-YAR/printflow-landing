/**
 * Datos del negocio que el ADMIN edita en el panel (tabla business_settings).
 *
 * SE LEEN EN EL BUILD, NUNCA EN EL NAVEGADOR. Esto no es una preferencia de
 * estilo, lo imponen dos reglas congeladas:
 *
 *   AGENTS 16 / G-01 — el sitio no hace fetch, XHR ni toca Supabase.
 *   AGENTS 18 / E-09 — los enlaces funcionan con JavaScript desactivado.
 *
 * La segunda es la que decide: si el numero de WhatsApp llegara por fetch, los
 * enlaces no podrian existir en el HTML servido. Aca el valor se hornea en el
 * HTML y el sitio sigue sin pedir nada en runtime.
 *
 * El modulo se importa solo desde frontmatter de .astro. No lo importe desde
 * un <script> de cliente: el top-level await y el fetch terminarian en el
 * bundle del navegador.
 *
 * Como se configura:
 *   SUPABASE_URL + SUPABASE_ANON_KEY  → lee del panel (sin prefijo PUBLIC_,
 *                                       asi Astro no las inyecta al cliente)
 *   ninguna de las dos               → usa PUBLIC_WHATSAPP_E164 y nada mas
 *
 * Si estan configuradas y la consulta falla, el build CAE. Es a proposito:
 * volver al valor de respaldo en silencio publicaria el sitio con un telefono
 * viejo y nadie se enteraria.
 */

export interface LandingSettings {
  businessName: string;
  /** E.164 sin "+". Cadena vacia = el sitio se publica sin botones de WhatsApp. */
  whatsappE164: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  hours: string | null;
  /** Porcentaje de anticipo. La copy lo cita; no se escribe a mano. */
  depositPct: number;
  leadDays: number;
  mapsUrl: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  announcement: string | null;
}

const COLUMNAS = [
  'business_name',
  'business_phone',
  'business_email',
  'business_address',
  'business_hours',
  'deposit_pct',
  'default_lead_days',
  'landing_whatsapp_e164',
  'landing_maps_url',
  'landing_instagram_url',
  'landing_facebook_url',
  'landing_announcement',
].join(',');

const SUPABASE_URL = import.meta.env.SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = import.meta.env.SUPABASE_ANON_KEY ?? '';

/** Respaldo cuando no hay panel configurado: lo que habia antes de esta fase. */
const RESPALDO: LandingSettings = {
  businessName: 'Imprenta Escalante',
  whatsappE164: import.meta.env.PUBLIC_WHATSAPP_E164 ?? '',
  phone: null,
  email: null,
  address: null,
  hours: null,
  depositPct: 50,
  leadDays: 3,
  mapsUrl: null,
  instagramUrl: null,
  facebookUrl: null,
  announcement: null,
};

/** Un texto vacio o en blanco vale lo mismo que no haberlo cargado. */
const texto = (v: unknown): string | null => {
  const s = typeof v === 'string' ? v.trim() : '';
  return s === '' ? null : s;
};

/**
 * La base ya exige https:// con un CHECK, pero esto se vuelve un href en una
 * pagina publica: se vuelve a verificar aca para que un cambio hecho directo
 * sobre la tabla tampoco pueda inyectar javascript: ni data:.
 */
const enlace = (v: unknown): string | null => {
  const s = texto(v);
  return s && s.startsWith('https://') ? s : null;
};

/** wa.me exige solo digitos. Un valor fuera de formato se descarta entero. */
const telefonoWhatsapp = (v: unknown): string => {
  const s = texto(v) ?? '';
  return /^[0-9]{10,15}$/.test(s) ? s : '';
};

const numero = (v: unknown, porDefecto: number): number => {
  const n = typeof v === 'string' ? Number.parseFloat(v) : typeof v === 'number' ? v : NaN;
  return Number.isFinite(n) ? n : porDefecto;
};

async function leerDelPanel(): Promise<LandingSettings> {
  const url = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/business_settings?select=${COLUMNAS}&limit=1`;

  const respuesta = await fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Accept: 'application/vnd.pgrst.object+json',
    },
  });

  if (!respuesta.ok) {
    throw new Error(
      `No se pudo leer business_settings (HTTP ${respuesta.status}). ` +
        'Revise que la migracion 0020 este aplicada: sin ella anon no tiene SELECT sobre la tabla.',
    );
  }

  const fila = (await respuesta.json()) as Record<string, unknown>;

  return {
    businessName: texto(fila.business_name) ?? RESPALDO.businessName,
    whatsappE164: telefonoWhatsapp(fila.landing_whatsapp_e164),
    phone: texto(fila.business_phone),
    email: texto(fila.business_email),
    address: texto(fila.business_address),
    hours: texto(fila.business_hours),
    depositPct: numero(fila.deposit_pct, RESPALDO.depositPct),
    leadDays: numero(fila.default_lead_days, RESPALDO.leadDays),
    mapsUrl: enlace(fila.landing_maps_url),
    instagramUrl: enlace(fila.landing_instagram_url),
    facebookUrl: enlace(fila.landing_facebook_url),
    announcement: texto(fila.landing_announcement),
  };
}

export const hayPanelConfigurado = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/* Top-level await: corre una sola vez por build, antes de renderizar la primera
   pagina. Vite cachea el modulo, asi que la consulta no se repite por componente. */
export const SETTINGS: LandingSettings = hayPanelConfigurado
  ? await leerDelPanel()
  : RESPALDO;
