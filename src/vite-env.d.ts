/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly API_BASE_URL: string;
    readonly TOKEN_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
