export interface SecurityConfig {
  maxRequestsPerMinute: number;
  requestTimeout: number;
  signingSecret: string;
  corsOrigins: string[];
  tokenRefreshThreshold: number;
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
