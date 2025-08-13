import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Order } from "@/types/orderTypes";

interface OrderState {
  orders: Order[];
  createOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  deleteOrder: (orderId: string) => void;
  getOrderStats: () => {
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
    completedOrders: number;
    averageOrderValue: number;
  };
  getRecentOrders: () => Order[];
}

export const useOrderStore = create<OrderState>()(
  devtools(
    persist(
      (set, get) => ({
        orders: [],
        createOrder: (orderData) => {
          const newOrder = {
            id: `ord-${Date.now()}`,
            createdAt: new Date().toISOString(),
            ...orderData
          };
          set(state => ({
            orders: [newOrder, ...state.orders]
          }));
        },
        updateOrderStatus: (orderId, status) => {
          set(state => ({
            orders: state.orders.map(order => 
              order.id === orderId ? { ...order, status } : order
            )
          }));
        },
        deleteOrder: (orderId) => {
          set(state => ({
            orders: state.orders.filter(order => order.id !== orderId)
          }));
        },
        getOrderStats: () => {
          const orders = get().orders;
          const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
          return {
            totalOrders: orders.length,
            totalRevenue,
            completedOrders: orders.filter(o => o.status === 'completed').length,
            pendingOrders: orders.filter(o => o.status === 'pending').length,
            averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0
          };
        },
        getRecentOrders: () => {
          return get().orders
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5);
        }
      }),
      {
        name: 'order-store'
      }
    )
  )
);
