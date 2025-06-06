interface ImportMetaEnv {
  readonly VITE_API_ORIGIN: string;
  readonly API_ORIGIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
