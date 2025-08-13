import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { ApiResponse, ApiError } from "@/types/apiTypes";

export class ApiService {
  private api: AxiosInstance;

  constructor() {
    const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
    this.api = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor for auth
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("auth-token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          localStorage.removeItem("auth-token");
          window.location.href = "/sign-in";
        }
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
