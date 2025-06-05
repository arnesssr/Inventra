export interface EnvConfig {
  wsUrl(wsUrl: any, arg1: { path: any; timeout: any; auth: { token: string; }; }): unknown;
  socketPath: string | undefined;
  socketTimeout: number | undefined;
  storefrontUrl: string;
  apiUrl: string;
  apiKey: string;
  webhookSecret: string;
  webhookUrl: string;
  appName: string;
  appVersion: string;
}

declare global {
  interface ImportMetaEnv {
    VITE_STOREFRONT_URL: string;
    VITE_API_URL: string;
    VITE_API_KEY: string;
    VITE_WEBHOOK_SECRET: string;
    VITE_WEBHOOK_URL: string;
    VITE_APP_NAME: string;
    VITE_APP_VERSION: string;
    MODE: 'development' | 'production';
  }
}
