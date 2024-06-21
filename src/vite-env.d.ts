/// <reference types="vite/client" />

interface ImportMetaEnv
{
    readonly VITE_GOOGLE_MAPS_API: string
    readonly VITE_GOOGLE_MAPS_MAP_ID: string
    readonly VITE_MERCADO_PAGO_PUBLIC_KEY: string
    // more env variables...
}
  
interface ImportMeta
{
    readonly env: ImportMetaEnv
}