import { api } from '../lib/api';
import type { 
  StockMovement, 
  InventoryItem, 
  StockOrder 
} from '../types/inventoryTypes';

export const inventoryService = {
  // Stock Management
  async createMovement(data: Omit<StockMovement, 'id'>) {
    try {
      const response = await api.post('/inventory/movements', data);
      return response.data;
    } catch (error) {
      console.error('Failed to create movement:', error);
      throw error;
    }
  },

  updateMinimumStock: (productId: string, minimum: number) =>
    api.patch(`/inventory/${productId}/minimum-stock`, { minimum }),

  adjustStock: (productId: string, adjustment: number) =>
    api.patch(`/inventory/${productId}/adjust`, { adjustment }),

  // Stock Orders
  createOrder: (data: Omit<StockOrder, 'id' | 'status'>) =>
    api.post('/inventory/orders', data),

  completeOrder: (orderId: string) =>
    api.patch(`/inventory/orders/${orderId}/complete`),

  cancelOrder: (orderId: string) =>
    api.patch(`/inventory/orders/${orderId}/cancel`),

  // Analytics
  getStats: () => api.get('/inventory/stats'),
  getMovements: (params?: { limit?: number; offset?: number }) =>
    api.get('/inventory/movements', { params }),
  getAlerts: () => api.get('/inventory/alerts'),
};
