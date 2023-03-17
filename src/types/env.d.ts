interface ImportMetaEnv {
  readonly VITE_CONCIERGE_API_ENDPOINT?: string
  readonly VITE_API_CONSENT_URL?: string
  readonly VITE_APP_CONSENT_URL?: string
  readonly VITE_LINK_API_CONSENT_URL?: string
  readonly VITE_LINK_APP_CONSENT_URL?: string
  readonly VITE_GRAPH_ME_API_ENDPOINT?: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
