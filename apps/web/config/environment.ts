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

// Ensure URLs are properly formatted with protocol
const formatUrl = (url: string): string => {
  if (!url) return '';
  return url.startsWith('http') ? url : `https://${url}`;
};

export const config: Record<string, EnvConfig> = {
  development: {
    storefrontUrl: formatUrl(import.meta.env.VITE_STOREFRONT_URL),
    apiUrl: formatUrl(import.meta.env.VITE_API_URL),
    apiKey: import.meta.env.VITE_API_KEY,
    webhookSecret: import.meta.env.VITE_WEBHOOK_SECRET,  // Add webhook secret
    webhookUrl: formatUrl(import.meta.env.VITE_WEBHOOK_URL),  // Add webhook URL
    appName: import.meta.env.VITE_APP_NAME,  // Add app name
    appVersion: import.meta.env.VITE_APP_VERSION,  // Add app version
    webhookEndpoints: {
      products: '/api/webhook/products',
      inventory: '/api/webhook/inventory',
      orders: '/api/webhook/orders'
    },
    wsUrl: import.meta.env.VITE_WS_URL,
    socketPath: import.meta.env.VITE_SOCKET_PATH,
    socketTimeout: Number(import.meta.env.VITE_SOCKET_TIMEOUT)
  },
  production: {
    storefrontUrl: formatUrl(import.meta.env.VITE_STOREFRONT_URL),
    apiUrl: formatUrl(import.meta.env.VITE_API_URL),
    apiKey: import.meta.env.VITE_API_KEY,
    webhookSecret: import.meta.env.VITE_WEBHOOK_SECRET,
    webhookUrl: formatUrl(import.meta.env.VITE_WEBHOOK_URL),
    appName: import.meta.env.VITE_APP_NAME,
    appVersion: import.meta.env.VITE_APP_VERSION,
    webhookEndpoints: {
      products: '/api/webhook/products',
      inventory: '/api/webhook/inventory',
      orders: '/api/webhook/orders'
    },
    wsUrl: import.meta.env.VITE_WS_URL,
    socketPath: import.meta.env.VITE_SOCKET_PATH,
    socketTimeout: Number(import.meta.env.VITE_SOCKET_TIMEOUT)
  }
};

export const getCurrentConfig = (): EnvConfig => {
  const mode = (import.meta.env.MODE || 'development') as string;
  const currentConfig = config[mode as keyof typeof config];

  // Validate required environment variables
  if (!currentConfig.apiKey) {
    
  }

  if (!currentConfig.storefrontUrl || !currentConfig.apiUrl) {
    
  }

  return currentConfig;
};
