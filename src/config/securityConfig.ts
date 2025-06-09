import { SecurityConfig } from '../types/security.types';

export const securityConfig: SecurityConfig = {
  maxRequestsPerMinute: 60,
  requestTimeout: 30000,
  signingSecret: import.meta.env.VITE_API_KEY,
  corsOrigins: [
    import.meta.env.VITE_API_URL,
    import.meta.env.VITE_STOREFRONT_URL
  ],
  tokenRefreshThreshold: 300 // 5 minutes in seconds
};
