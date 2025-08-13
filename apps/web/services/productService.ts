import { apiService } from "./apiService";
import type { CreateProductInput, Product } from "@/types/productTypes";

class ProductService {

  async testConnection(): Promise<any> {
    return apiService.get('/health');
  }

  async getProducts(): Promise<Product[]> {
    return apiService.get<Product[]>('/products');
  }

  async createProduct(data: CreateProductInput): Promise<Product> {
    return apiService.post<Product>('/products', {
      ...data,
      status: data.status || 'draft',
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    });
  }

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    return apiService.put<Product>(`/products/${id}`, data);
  }

  async getProduct(id: string): Promise<Product> {
    return apiService.get<Product>(`/products/${id}`);
  }

  async publishProduct(id: string): Promise<Product> {
    return apiService.post<Product>(`/products/${id}/publish`);
  }

  async unpublishProduct(id: string): Promise<Product> {
    return apiService.post<Product>(`/products/${id}/unpublish`);
  }

  async uploadProductImages(files: File[]): Promise<string[]> {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));

    const response = await apiService.post<{urls: string[]}>('/products/images', formData);
    return response.urls;
  }
}

export const productService = new ProductService();
