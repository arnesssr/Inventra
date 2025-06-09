import axios, { AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';
import { API_CONFIG, ApiResponse } from '../../config/apiConfig';
import { requestQueue } from './requestQueue';
import { cacheManager } from './cacheManager';

export class RequestHandler {
  private cancelTokens = new Map<string, () => void>();

  async request<T>(config: AxiosRequestConfig & { cacheKey?: string }): Promise<ApiResponse<T>> {
    // Cancel existing request with same cache key
    if (config.cacheKey && this.cancelTokens.has(config.cacheKey)) {
      this.cancelTokens.get(config.cacheKey)!();
    }

    // Check cache
    if (config.cacheKey) {
      const cached = cacheManager.get<ApiResponse<T>>(config.cacheKey);
      if (cached) return { ...cached, cached: true };
    }

    // Setup cancellation
    const cancelToken = axios.CancelToken.source();
    if (config.cacheKey) {
      this.cancelTokens.set(config.cacheKey, () => cancelToken.cancel());
    }

    return requestQueue.add(async () => {
      let attempt = 0;
      while (attempt < API_CONFIG.retryAttempts) {
        try {
          const response = await axios({
            ...config,
            baseURL: API_CONFIG.baseURL,
            timeout: API_CONFIG.timeout,
            cancelToken: cancelToken.token
          });

          const apiResponse = this.formatResponse<T>(response);
          
          if (config.cacheKey) {
            cacheManager.set(config.cacheKey, apiResponse);
            this.cancelTokens.delete(config.cacheKey);
          }

          return apiResponse;
        } catch (error) {
          if (axios.isCancel(error)) {
            throw error;
          }
          
          attempt++;
          if (attempt === API_CONFIG.retryAttempts) {
            throw error;
          }
          
          await new Promise(resolve => 
            setTimeout(resolve, API_CONFIG.retryDelay * attempt)
          );
        }
      }
      throw new Error('Request failed after all retry attempts');
    });
  }

  private formatResponse<T>(response: AxiosResponse): ApiResponse<T> {
    return {
      data: response.data,
      status: response.status,
      headers: response.headers as Record<string, string>
    };
  }
}

export const requestHandler = new RequestHandler();
