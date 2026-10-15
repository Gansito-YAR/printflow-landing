/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Numero de respaldo cuando no hay panel administrativo configurado. */
  readonly PUBLIC_WHATSAPP_E164: string;
  /**
   * Panel administrativo. Sin prefijo PUBLIC_ a proposito: Astro inyecta las
   * variables privadas solo en el codigo de servidor, nunca en el bundle del
   * navegador (ver lib/settings.ts).
   */
  readonly SUPABASE_URL: string;
  /** Clave publicable (anon). La service_role NO va en el entorno de build. */
  readonly SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
