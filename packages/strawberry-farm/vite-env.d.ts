/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SSR: string;
  readonly BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}