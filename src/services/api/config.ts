export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL,
  storefrontUrl: import.meta.env.VITE_STOREFRONT_URL,
  apiKey: import.meta.env.VITE_API_KEY,
  timeout: 30000, // 30 seconds
  retryAttempts: 3
};

export const ENDPOINTS = {
  products: '/products',
  orders: '/orders',
  inventory: '/inventory',
  suppliers: '/suppliers',
  storefront: '/storefront'
};
