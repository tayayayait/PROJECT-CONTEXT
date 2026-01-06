/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DOCUMENT_ANALYSIS_ENDPOINT?: string;
  readonly VITE_OPENAI_API_KEY?: string;
  readonly VITE_OPENAI_API_BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*?url" {
  const src: string;
  export default src;
}
