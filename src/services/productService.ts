import { API_CONFIG } from "@/config/apiConfig";
import axios from 'axios';
import { apiService } from "@/apiService";
import type { CreateProductInput, Product } from "@/types/productTypes";

class ProductService {
  private config = API_CONFIG;
  private axiosInstance = axios.create({
    baseURL: this.config.baseUrl,
    timeout: this.config.timeout,
    headers: this.config.headers
  });

  async testConnection(): Promise<any> {
    return apiService.get('/health');
  }

  async getProducts(): Promise<Product[]> {
    try {
      const response = await this.axiosInstance.get(this.config.endpoints.products.base);
      return response.data;
    } catch (error) {
      
      throw error;
    }
  }

  async createProduct(data: CreateProductInput): Promise<Product> {
    try {
      // Log the request
      
      
      // Ensure correct endpoint
      const response = await apiService.post<Product>(this.config.endpoints.products.base, {
        ...data,
        status: data.status || 'draft',
        id: crypto.randomUUID(), // Generate ID for new products
        createdAt: new Date().toISOString()
      }, {
        headers: this.config.headers
      });
      
      
      return response;
    } catch (error: any) {
      console.error('Product creation failed:', {
        error,
        status: error.response?.status,
        data: error.response?.data
      });
      throw error;
    }
  }

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    return apiService.put<Product>(`${this.config.endpoints.products.base}/${id}`, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async publishToStorefront(id: string): Promise<void> {
    return apiService.post(`${this.config.endpoints.products.base}/${id}/publish`, {}, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async unpublishFromStorefront(id: string): Promise<void> {
    return apiService.post(`${this.config.endpoints.products.base}/${id}/unpublish`, {}, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async getProduct(id: string): Promise<Product> {
    return apiService.get<Product>(`${this.config.endpoints.products.base}/${id}`);
  }

  async publishProduct(id: string): Promise<Product> {
    return apiService.post<Product>(`${this.config.endpoints.products.base}/${id}/publish`, {}, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async unpublishProduct(id: string): Promise<Product> {
    return apiService.post<Product>(`${this.config.endpoints.products.base}/${id}/unpublish`, {}, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async uploadProductImages(files: File[]): Promise<string[]> {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));

    try {
      const response = await apiService.post<{urls: string[]}>(
        `${this.config.endpoints.products.base}/images`, 
        formData,
        {
          headers: {
            ...this.config.headers,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.urls;
    } catch (error: any) {
      
      throw error;
    }
  }
}

export const productService = new ProductService();
