// Simplified environment configuration
export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  wsUrl: import.meta.env.VITE_WS_URL || 'ws://localhost:8000',
  environment: import.meta.env.MODE || 'development',
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production',
} as const;