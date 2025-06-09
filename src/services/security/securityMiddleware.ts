import { AxiosRequestConfig, AxiosResponse, AxiosHeaders } from 'axios';
import { RequestSigner } from './requestSigner';
import { rateLimiter } from './rateLimiter';
import { RequestValidator } from './requestValidator';
import { tokenManager } from './tokenManager';
import { securityConfig } from '../../config/securityConfig';

export class SecurityMiddleware {
  static async requestInterceptor(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
    // Initialize headers if they don't exist
    config.headers = config.headers || new AxiosHeaders();

    // Check rate limiting
    if (!rateLimiter.canMakeRequest()) {
      throw new Error('Rate limit exceeded');
    }

    // Add request signing
    if (config.data) {
      const signature = RequestSigner.sign(config.data);
      config.headers = {
          ...config.headers,
          'X-Request-Signature': signature.signature,
          'X-Request-Timestamp': signature.timestamp,
          'X-Request-Nonce': signature.nonce
      } as unknown as AxiosHeaders;
    }

    // Add authentication
    const token = tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add CORS headers
    config.headers['Access-Control-Allow-Origin'] = securityConfig.corsOrigins.join(',');

    return config;
  }

  static async responseInterceptor(response: AxiosResponse): Promise<AxiosResponse> {
    // Verify response signature if present
    const signature = {
      signature: response.headers['x-response-signature'],
      timestamp: response.headers['x-response-timestamp'],
      nonce: response.headers['x-response-nonce']
    };

    if (signature.signature && !RequestSigner.verify(signature, response.data)) {
      throw new Error('Invalid response signature');
    }

    return response;
  }
}
