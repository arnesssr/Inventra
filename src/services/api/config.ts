export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL,
  storefrontUrl: import.meta.env.VITE_STOREFRONT_URL,
  apiKey: import.meta.env.VITE_API_KEY,
  timeout: 30000,
  retryAttempts: 3,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-API-Key': import.meta.env.VITE_API_KEY
  }
};

// Add debug logging
console.log('API Request Config:', {
  baseUrl: API_CONFIG.baseUrl,
  headers: API_CONFIG.headers
});

export const ENDPOINTS = {
  products: '/products',
  orders: '/orders',
  inventory: '/inventory',
  suppliers: '/suppliers',
  storefront: '/storefront',
  pms: {
    publish: '/api/pms/products/publish',
    syncInventory: '/api/pms/inventory/sync'
  }
};
