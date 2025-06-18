import { apiService } from './apiService';
import type { Product, ProductInput } from '../types/productTypes';
import { API_CONFIG } from './api/config';

export class ProductService {
  // Use config instead of hardcoded paths
  private baseUrl = `${API_CONFIG.baseUrl}/products`;

  async testConnection(): Promise<any> {
    return apiService.get('/health');
  }

  async getProducts(): Promise<Product[]> {
    const response = await apiService.get<Product[]>(this.baseUrl);
    return response.data;
  }

  async createProduct(data: ProductInput): Promise<Product> {
    try {
      // Log the request
      console.log('Creating product with data:', data);
      
      // Ensure correct endpoint
      const response = await apiService.post<Product>(this.baseUrl, {
        ...data,
        status: data.status || 'draft',
        id: crypto.randomUUID(), // Generate ID for new products
        createdAt: new Date().toISOString()
      }, {
        headers: API_CONFIG.headers
      });
      
      console.log('Product created successfully:', response);
      return response.data;
    } catch (error: any) {
      console.error('Product creation failed:', {
        error,
        status: error.response?.status,
        data: error.response?.data
      });
      throw {
        error: error,
        status: error.response?.status,
        data: error.response?.data
      };
    }
  }

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    const response = await apiService.put<Product>(`${this.baseUrl}/${id}`, data, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  }

  async publishToStorefront(id: string): Promise<void> {
    await apiService.post(`${this.baseUrl}/${id}/publish`, {}, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async unpublishFromStorefront(id: string): Promise<void> {
    await apiService.post(`${this.baseUrl}/${id}/unpublish`, {}, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async getProduct(id: string): Promise<Product> {
    const response = await apiService.get<Product>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async publishProduct(id: string): Promise<Product> {
    try {
      const { data } = await apiService.post<Product>(
        `/products/${id}/publish`
      );
      return data;
    } catch (error) {
      console.error('Product publish failed:', error);
      throw error;
    }
  }

  async unpublishProduct(id: string): Promise<Product> {
    try {
      const { data } = await apiService.post<Product>(
        `/products/${id}/unpublish`
      );
      return data;
    } catch (error) {
      console.error('Product unpublish failed:', error);
      throw error;
    }
  }

  async uploadProductImages(files: File[]): Promise<string[]> {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));

    try {
      const response = await apiService.post<{urls: string[]}>(
        `${this.baseUrl}/images`, 
        formData,
        {
          headers: {
            ...API_CONFIG.headers,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data.urls;
    } catch (error: any) {
      console.error('Image upload failed:', error);
      throw error;
    }
  }
}

export const productService = new ProductService();
