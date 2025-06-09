import type { SecurityConfig } from '../types/security.types';

export const securityConfig: SecurityConfig = {
    signatureSecret: import.meta.env.VITE_SECURITY_SIGNATURE_SECRET,
    timestampTolerance: Number(import.meta.env.VITE_SECURITY_TIMESTAMP_TOLERANCE),
    nonceTimeout: Number(import.meta.env.VITE_SECURITY_NONCE_TIMEOUT),

    rateLimitWindow: Number(import.meta.env.VITE_RATE_LIMIT_WINDOW),
    maxRequests: Number(import.meta.env.VITE_RATE_LIMIT_MAX_REQUESTS),

    enableRequestLogging: import.meta.env.VITE_ENABLE_REQUEST_LOGGING === 'true',
    enablePerformanceMetrics: import.meta.env.VITE_ENABLE_PERFORMANCE_METRICS === 'true',

    corsOrigins: [
        import.meta.env.VITE_API_URL,
        import.meta.env.VITE_STOREFRONT_URL
    ],
    tokenRefreshThreshold: 0,
    signingSecret: function (arg0: string, signingSecret: any): unknown {
        throw new Error('Function not implemented.');
    },
    maxRequestsPerMinute: 0
};
