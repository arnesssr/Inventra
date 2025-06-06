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
    return apiService.post<Product>(this.baseUrl, data);
  }

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    return apiService.put<Product>(`${this.baseUrl}/${id}`, data);
  }

  async publishToStorefront(id: string): Promise<void> {
    return apiService.post(`${this.baseUrl}/${id}/publish`);
  }

  async unpublishFromStorefront(id: string): Promise<void> {
    return apiService.post(`${this.baseUrl}/${id}/unpublish`);
  }

  async getProduct(id: string): Promise<Product> {
    return apiService.get<Product>(`${this.baseUrl}/${id}`);
  }

  async publishProduct(id: string): Promise<Product> {
    return apiService.post<Product>(`${this.baseUrl}/${id}/publish`);
  }

  async unpublishProduct(id: string): Promise<Product> {
    return apiService.post<Product>(`${this.baseUrl}/${id}/unpublish`);
  }
}

export const productService = new ProductService();
