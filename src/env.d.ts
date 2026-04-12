/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_CONTACT_EMAIL?: string;
  readonly PUBLIC_CONTACT_GITHUB?: string;
  readonly PUBLIC_CONTACT_LINKEDIN?: string;
  readonly PUBLIC_SENSITIVE_QUERY_KEY?: string;
  readonly PUBLIC_SENSITIVE_QUERY_VALUE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
