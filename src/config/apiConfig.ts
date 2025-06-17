export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  storefrontUrl: import.meta.env.VITE_STOREFRONT_URL || 'http://localhost:3000',
  apiKey: import.meta.env.VITE_API_KEY || '',
  timeout: 30000,
  retryAttempts: 3,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-API-Key': import.meta.env.VITE_API_KEY || ''
  },
  endpoints: {
    products: {
      base: '/api/products',
      publish: (id: string) => `/api/products/${id}/publish`,
      unpublish: (id: string) => `/api/products/${id}/unpublish`,
      archive: (id: string) => `/api/products/${id}/archive`,
      restore: (id: string) => `/api/products/${id}/restore`,
      bulk: '/api/products/bulk'
    }
  }
} as const;

export type ApiResponse<T> = {
  data: T;
  status: number;
  headers: Record<string, string>;
  cached?: boolean;
};

export type ApiConfig = typeof API_CONFIG;
