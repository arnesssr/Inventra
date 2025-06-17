import axios from 'axios';

export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL,
  endpoints: {
    pms: '/api/pms',
    products: '/api/products',
    health: '/health'
  },
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-API-Key': import.meta.env.VITE_API_KEY
  },
  timeout: 5000 // Adding timeout in milliseconds
};

// Add debug logging
console.log('API Request Config:', {
  baseUrl: API_CONFIG.baseUrl,
  headers: {
    'Content-Type': API_CONFIG.headers['Content-Type'],
    'Accept': API_CONFIG.headers['Accept'],
    'X-API-Key': '***' // Hide actual key in logs
  }
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

// Add request interceptor config
const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseUrl,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add timestamp and request ID
    config.headers['X-Request-Time'] = new Date().toISOString();
    config.headers['X-Request-ID'] = crypto.randomUUID();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific error codes
      switch (error.response.status) {
        case 401:
          console.error('Unauthorized request');
          break;
        case 403:
          console.error('Forbidden request');
          break;
        case 404:
          console.error('Resource not found');
          break;
        default:
          console.error('Server error:', error.response.status);
      }
    } else if (error.request) {
      console.error('No response received');
    }
    return Promise.reject(error);
  }
);

export { axiosInstance as apiClient };