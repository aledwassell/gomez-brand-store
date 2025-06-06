interface ImportMetaEnv {
  readonly VITE_API_ORIGIN: string;
  readonly API_ORIGIN: string;
  readonly PRINTFUL_ACCESS_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
