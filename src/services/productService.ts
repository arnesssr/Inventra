import { API_CONFIG } from './api/config';
import { api } from '../lib/api';
import type { Product } from '../types/productTypes';

interface ProductData {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrls: string[];
  status: 'draft' | 'published' | 'archived';
  stock: number;
}

export const productService = {
  // Test API connection
  testConnection: async () => {
    const response = await api.get('/health');
    return response.data;
  },

  createProduct: async (data: Omit<Product, 'id'>): Promise<Product> => {
    try {
      const response = await api.post('/api/products', data);
      // Ensure we return the data property from response
      return response.data.data;
    } catch (error) {
      console.error('Failed to create product:', error);
      throw error;
    }
  },

  async updateProduct(id: string, data: Partial<Product>) {
    try {
      const response = await api.patch(`/api/products/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to update product:', error);
      throw error;
    }
  },

  async publishProduct(id: string) {
    try {
      const response = await api.post(`/api/products/${id}/publish`);
      return response.data;
    } catch (error) {
      console.error('Failed to publish product:', error);
      throw error;
    }
  },

  publishToStorefront: async (productId: string) => {
    try {
      const response = await api.post(`/api/products/${productId}/publish`)
      return response.data
    } catch (error) {
      console.error('Failed to publish product:', error)
      throw error
    }
  },

  unpublishFromStorefront: async (productId: string) => {
    try {
      const response = await api.post(`/api/products/${productId}/unpublish`)
      return response.data
    } catch (error) {
      console.error('Failed to unpublish product:', error)
      throw error
    }
  },

  async getProducts() {
    try {
      const response = await api.get('/api/products');
      return response.data;
    } catch (error) {
      console.error('Failed to get products:', error);
      throw error;
    }
  }
};
