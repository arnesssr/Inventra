import { create } from 'zustand';
import { useProductStore } from './productStore';
import { useInventoryStore } from './inventoryStore';
import { useOrderStore } from './orderStore';

interface ActivityItem {
  id: string;
  type: 'product' | 'inventory' | 'order' | 'system';
  title: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

interface ActivityState {
  getRecentActivity: () => ActivityItem[];
}

export const useActivityStore = create<ActivityState>((set, get) => ({
  getRecentActivity: () => {
    const productActivities = useProductStore.getState().getRecentChanges();
    const inventoryActivities = useInventoryStore.getState().getRecentMovements();
    const orderActivities = useOrderStore.getState().getRecentOrders();

    const allActivities = [
      ...productActivities.map(p => ({
        id: `prod-${p.id}`,
        type: 'product' as const,
        title: 'Product Updated',
        description: `${p.name} was ${p.status}`,
        timestamp: p.updatedAt
      })),
      ...orderActivities.map(o => ({
        id: `ord-${o.id}`,
        type: 'order' as const,
        title: 'New Order',
        description: `Order #${o.orderNumber} was created`,
        timestamp: o.createdAt
      }))
    ].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ).slice(0, 5);

    return allActivities;
  }
}));
