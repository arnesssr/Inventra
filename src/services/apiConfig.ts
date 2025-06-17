export const API_CONFIG = {
  baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  timeout: 30000,
  retryAttempts: 3,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-API-Key': process.env.REACT_APP_API_KEY || ''
  },
  endpoints: {
    products: {
      list: '/api/products',
      create: '/api/products',
      update: (id: string) => `/api/products/${id}`,
      delete: (id: string) => `/api/products/${id}`,
      publish: (id: string) => `/api/products/${id}/publish`,
      archive: (id: string) => `/api/products/${id}/archive`,
      restore: (id: string) => `/api/products/${id}/restore`,
      bulkUpdate: '/api/products/bulk'
    }
  }
}
