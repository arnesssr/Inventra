export interface SecurityConfig {
  tokenRefreshThreshold: number;
  signingSecret(arg0: string, signingSecret: any): unknown;
  maxRequestsPerMinute: number;
  // Security settings
  signatureSecret: string;
  timestampTolerance: number;
  nonceTimeout: number;
  
  // Rate limiting
  rateLimitWindow: number;
  maxRequests: number;
  
  // Monitoring
  enableRequestLogging: boolean;
  enablePerformanceMetrics: boolean;
  
  // CORS
  corsOrigins: string[];
}

export interface RequestSignature {
  timestamp: string;
  signature: string;
  nonce: string;
}

export interface ValidationSchema {
  [key: string]: {
    type: 'string' | 'number' | 'boolean' | 'object' | 'array';
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: RegExp;
  }
}

export type ValidationResult = {
  isValid: boolean;
  errors: string[];
}
