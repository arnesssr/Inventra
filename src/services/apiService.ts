import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getCurrentConfig } from '../config/environment';
import type { ApiResponse, ApiError } from '../types/apiTypes';
import { API_CONFIG } from './api/config';

export class ApiService {
  private api: AxiosInstance;

  constructor() {
    const config = getCurrentConfig();
    this.api = axios.create({
      baseURL: config.apiUrl,
      timeout: 60000, // Increased timeout
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.apiKey
      },
      withCredentials: true // Added CORS credentials
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

export const apiService = {
  async post<T>(endpoint: string, data: any, p0: { headers: { 'Content-Type': string; }; }): Promise<T> {
    try {
      const config = {
        method: 'POST',
        url: `${API_CONFIG.baseUrl}${endpoint}`,
        data,
        headers: {
          ...API_CONFIG.headers,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        withCredentials: false // Set to false for now
      };

      const response = await axios(config);
      return response.data;
    } catch (error: any) {
      console.error('API Error:', error);
      throw error;
    }
  },

  async get<T>(endpoint: string): Promise<T> {
    if (!endpoint) {
      throw new Error('Endpoint is required');
    }
    try {
      const config = {
        method: 'GET',
        url: `${API_CONFIG.baseUrl}${endpoint}`,
        headers: {
          ...API_CONFIG.headers,
          'Content-Type': 'application/json'
        },
        withCredentials: false
      };

      const response = await axios(config);
      return response.data;
    } catch (error: any) {
      console.error('API Error:', error);
      throw error;
    }
  },

  async put<T>(endpoint: string, data: any, config = {
    headers: { 'Content-Type': 'application/json' }
  }): Promise<T> {
    if (!endpoint) {
      throw new Error('Endpoint is required');
    }
    try {
      const response = await axios({
        method: 'PUT',
        url: `${API_CONFIG.baseUrl}${endpoint}`,
        data,
        headers: {
          ...API_CONFIG.headers,
          ...config.headers
        }
      });
      return response.data;
    } catch (error: any) {
      console.error('API Error:', error);
      throw error;
    }
  }
};
