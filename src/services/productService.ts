import { apiService } from './apiService';
import type { Product } from '../types/productTypes';

export class ProductService {
  private baseUrl = '/api/products';

  async testConnection(): Promise<any> {
    return apiService.get('/health');
  }

  async getProducts(): Promise<Product[]> {
    return apiService.get<Product[]>(this.baseUrl);
  }

  async createProduct(data: Omit<Product, 'id'>): Promise<Product> {
    try {
      // Log the request
      console.log('Creating product with data:', data);
      
      // Ensure correct endpoint
      const response = await apiService.post<Product>('/api/pms/products', {
        ...data,
        status: data.status || 'draft'
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      console.log('Product created successfully:', response);
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
    return apiService.put<Product>(`${this.baseUrl}/${id}`, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async publishToStorefront(id: string): Promise<void> {
    return apiService.post(`${this.baseUrl}/${id}/publish`, {}, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async unpublishFromStorefront(id: string): Promise<void> {
    return apiService.post(`${this.baseUrl}/${id}/unpublish`, {}, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async getProduct(id: string): Promise<Product> {
    return apiService.get<Product>(`${this.baseUrl}/${id}`);
  }

  async publishProduct(id: string): Promise<Product> {
    return apiService.post<Product>(`${this.baseUrl}/${id}/publish`, {}, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async unpublishProduct(id: string): Promise<Product> {
    return apiService.post<Product>(`${this.baseUrl}/${id}/unpublish`, {}, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async uploadProductImages(files: File[]): Promise<string[]> {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));

    try {
      const response = await apiService.post<{urls: string[]}>('/api/pms/products/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.urls;
    } catch (error: any) {
      console.error('Image upload failed:', error);
      throw new Error(error.response?.data?.message || 'Failed to upload images');
    }
  }
}

export const productService = new ProductService();
