export interface EnvConfig {
  storefrontUrl: string;
  apiUrl: string;
  apiKey: string;
  webhookSecret: string;
  webhookUrl: string;
  appName: string;
  appVersion: string;
  wsUrl: string;
  socketPath: string;
  socketTimeout: number;
  webhookEndpoints: {
    products: string;
    inventory: string;
    orders: string;
  };
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
    VITE_WS_URL: string;
    VITE_SOCKET_PATH: string;
    VITE_SOCKET_TIMEOUT: string;
    MODE: 'development' | 'production';
  }
}
