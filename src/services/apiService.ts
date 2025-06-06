import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getCurrentConfig } from '../config/environment';
import type { ApiResponse, ApiError } from '../types/apiTypes';

export class ApiService {
  private api: AxiosInstance;

  constructor() {
    const config = getCurrentConfig();
    this.api = axios.create({
      baseURL: config.apiUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.apiKey
      }
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.api.interceptors.response.use(
      response => response,
      error => {
        console.error('API Error:', error);
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.get<ApiResponse<T>>(url, config);
    return response.data.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.post<ApiResponse<T>>(url, data, config);
    return response.data.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.put<ApiResponse<T>>(url, data, config);
    return response.data.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.delete<ApiResponse<T>>(url, config);
    return response.data.data;
  }
}

export const apiService = new ApiService();
