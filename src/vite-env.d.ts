/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  /** Set to `"true"` when Stripe Edge + secrets are live — shows Settings checkout button. */
  readonly VITE_BILLING_CHECKOUT_ENABLED?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
