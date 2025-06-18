import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import { getCurrentConfig } from "../config/environment";

interface RetryConfig extends AxiosRequestConfig {
  _retry?: number;
  _retryCount?: number;
}

export class ApiService {
  private instance: AxiosInstance;
  private maxRetries = 3;
  private baseDelay = 1000;

  constructor() {
    this.instance = axios.create({
      baseURL: getCurrentConfig().apiUrl,
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.response.use(
      response => response,
      async (error: AxiosError) => {
        const config = error.config as RetryConfig;
        
        // If no retry count is set, initialize it
        if (config._retryCount === undefined) {
          config._retryCount = 0;
        }

        // Only retry on network errors or 5xx server errors
        if (
          config._retryCount < this.maxRetries &&
          (error.code === 'ECONNABORTED' || 
           (error.response && error.response.status >= 500))
        ) {
          config._retryCount += 1;
          
          // Exponential backoff
          const delay = this.baseDelay * Math.pow(2, config._retryCount - 1);
          await new Promise(resolve => setTimeout(resolve, delay));
          
          // Retry the request
          return this.instance(config);
        }

        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig) {
    return this.instance.get<T>(url, config);
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.post<T>(url, data, config);
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.put<T>(url, data, config);
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.patch<T>(url, data, config);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.instance.delete<T>(url, config);
  }
}

export const apiService = new ApiService();
