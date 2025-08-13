import { apiService } from "@/apiService";
import type { Order, OrderStatus } from "@/types/orderTypes";

export class OrderService {
  private baseUrl = '/api/orders';

  async getOrders(): Promise<Order[]> {
    return apiService.get<Order[]>(this.baseUrl);
  }

  async createOrder(data: Omit<Order, 'id' | 'status'>): Promise<Order> {
    return apiService.post<Order>(this.baseUrl, data);
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    return apiService.put<Order>(`${this.baseUrl}/${id}/status`, { status });
  }
}

export const orderService = new OrderService();
