import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { StockMovement, InventoryItem, StockOrder } from "@/types/inventoryTypes";
import { useSocket } from "@/hooks/useSocket";

export interface InventoryState {
  inventory: Record<string, InventoryItem>;
  stockOrders: StockOrder[];
  
  // Stock Management
  addStockMovement: (movement: Omit<StockMovement, 'id'>) => void;
  updateMinimumStock: (productId: string, minimum: number) => void;
  adjustProductStock: (productId: string, adjustment: number) => void;
  
  // Stock Orders
  createStockOrder: (order: Omit<StockOrder, 'id' | 'status'>) => void;
  completeStockOrder: (orderId: string) => void;
  cancelStockOrder: (orderId: string) => void;
  
  // Stats & Analytics
  getInventoryStats: () => {
    totalValue: number;
    lowStockCount: number;
    outOfStockCount: number;
    totalProducts: number;
  };
  
  getRecentMovements: () => StockMovement[];

  // New methods
  generateStockAlerts: () => {
    productId: string;
    currentStock: number;
    minimumStock: number;
  }[];
  getAuditTrail: (productId: string) => StockMovement[];
  calculateStockValue: () => number;
  getStockMetrics: () => {
    totalProducts: number;
    lowStockCount: number;
    outOfStockCount: number;
    totalValue: number;
  };
  getStockAlerts: () => Array<{productId: string, currentStock: number, minimum: number}>;
  getInventoryValue: () => number;
  getStockMovements: (productId: string) => StockMovement[];
  getInventoryMetrics: () => {
    totalItems: number;
    lowStock: number;
    outOfStock: number;
    totalValue: number;
  };
  getStockHistory: (productId: string) => {
    date: string;
    change: number;
    reason: string;
  }[];
  getStockValue: (productId: string) => number;
  getMinimumStockAlerts: () => {
    productId: string;
    currentStock: number;
    minimumRequired: number;
  }[];
  setInventoryPrice: (productId: string, price: number) => void;  // Add method to update price
  adjustStock: (productId: string, quantity: number, type: 'in' | 'out') => void;
}

export const useInventoryStore = create<InventoryState>()(
  devtools(
    persist(
      (set, get) => ({
        inventory: {},
        stockOrders: [],

        addStockMovement: (movement) => {
          const productId = movement.productId;
          set((state) => {
            const item = state.inventory[productId];
            const currentStock = item?.currentStock || 0; // Use currentStock instead of quantity
            const newStock = currentStock + movement.quantity;
            
            return {
              inventory: {
                ...state.inventory,
                [productId]: {
                  ...item,
                  currentStock: newStock, // Update currentStock
                  movements: [
                    ...(item?.movements || []),
                    { ...movement, id: `${productId}-${Date.now()}` }
                  ]
                }
              }
            };
          });
        },

        updateMinimumStock: (productId, minimum) => {
          set((state) => ({
            inventory: {
              ...state.inventory,
              [productId]: {
                ...state.inventory[productId],
                minimumStock: minimum
              }
            }
          }));
        },

        adjustProductStock: (productId, adjustment) => {
          set((state) => {
            const currentStock = state.inventory[productId]?.currentStock || 0;
            const newStock = currentStock + adjustment;
            
            return {
              inventory: {
                ...state.inventory,
                [productId]: {
                  ...state.inventory[productId],
                  currentStock: newStock
                }
              }
            };
          });
        },

        createStockOrder: (order) => {
          const orderId = `order-${Date.now()}`;
          set((state) => ({
            stockOrders: [
              ...state.stockOrders,
              {
                id: orderId,
                productId: order.productId,
                quantity: order.quantity,
                status: 'pending',
                createdAt: new Date().toISOString()
              }
            ]
          }));
        },

        completeStockOrder: (orderId) => {
          set((state) => ({
            stockOrders: state.stockOrders.map(order =>
              order.id === orderId ? { ...order, status: 'completed', completedAt: new Date().toISOString() } : order
            )
          }));
        },

        cancelStockOrder: (orderId) => {
          set((state) => ({
            stockOrders: state.stockOrders.filter(order => order.id !== orderId)
          }));
        },

        getInventoryStats: () => {
          const inventory = get().inventory;
          const totalValue = Object.values(inventory).reduce((sum, item) => sum + item.price * item.currentStock, 0);
          const lowStockCount = Object.values(inventory).filter(item => item.currentStock < (item.minimumStock || 0)).length;
          const outOfStockCount = Object.values(inventory).filter(item => item.currentStock === 0).length;
          const totalProducts = Object.keys(inventory).length;

          return {
            totalValue,
            lowStockCount,
            outOfStockCount,
            totalProducts
          };
        },

        getRecentMovements: () => {
          const inventory = get().inventory;
          return Object.values(inventory).flatMap(item => item.movements || []).slice(-10);
        },

        generateStockAlerts: () => {
          const inventory = get().inventory;
          return Object.entries(inventory)
            .filter(([_, item]) => item.currentStock <= item.minimumStock)
            .map(([productId, item]) => ({
              productId,
              currentStock: item.currentStock,
              minimumStock: item.minimumStock
            }));
        },

        getAuditTrail: (productId) => {
          const item = get().inventory[productId];
          return item?.movements || [];
        },

        calculateStockValue: () => {
          const inventory = get().inventory;
          return Object.values(inventory).reduce((total, item) => 
            total + (item.currentStock * (item.price || 0)), 0);
        },

        getStockMetrics: () => {
          const inventory = get().inventory;
          const items = Object.values(inventory);
          
          return {
            totalProducts: items.length,
            lowStockCount: items.filter(i => i.currentStock <= i.minimumStock).length,
            outOfStockCount: items.filter(i => i.currentStock === 0).length,
            totalValue: get().calculateStockValue()
          };
        },

        adjustStock: (productId, quantity, type) => {
          set(state => {
            const item = state.inventory[productId];
            const newQuantity = type === 'in' ? 
              (item?.currentStock || 0) + quantity :
              (item?.currentStock || 0) - quantity;
            
            const movement = {
              id: Date.now().toString(),
              productId,
              quantity,
              type,
              date: new Date().toISOString()
            };

            return {
              inventory: {
                ...state.inventory,
                [productId]: {
                  ...item,
                  currentStock: newQuantity,
                  movements: [
                    ...(item?.movements || []),
                    movement
                  ]
                }
              }
            };
          });
        },

        getStockAlerts: () => {
          const { inventory } = get();
          return Object.entries(inventory)
            .filter(([_, item]) => (item.currentStock || 0) <= (item.minimumStock || 0))
            .map(([productId, item]) => ({
              productId,
              currentStock: item.currentStock || 0,
              minimum: item.minimumStock || 0
            }));
        },

        getInventoryValue: () => {
          const { inventory } = get();
          return Object.values(inventory).reduce((total, item) => 
            total + ((item.currentStock || 0) * (item.price || 0)), 0);
        },

        getStockMovements: (productId) => {
          return get().inventory[productId]?.movements || [];
        },

        getInventoryMetrics: () => {
          const { inventory } = get();
          const items = Object.values(inventory);
          
          return {
            totalItems: items.length,
            lowStock: items.filter(i => (i.currentStock || 0) <= (i.minimumStock || 0)).length,
            outOfStock: items.filter(i => (i.currentStock || 0) === 0).length,
            totalValue: get().getInventoryValue()
          };
        },

        getStockHistory: (productId) => {
          const item = get().inventory[productId];
          return (item?.movements || []).map(m => ({
            date: m.date,
            change: m.type === 'in' ? m.quantity : -m.quantity,
            reason: m.reason || 'Stock adjustment'
          }));
        },

        getStockValue: (productId) => {
          const item = get().inventory[productId];
          return (item?.currentStock || 0) * (item?.price || 0);
        },

        getMinimumStockAlerts: () => {
          const inventory = get().inventory;
          return Object.entries(inventory)
            .filter(([_, item]) => item.currentStock <= item.minimumStock)
            .map(([productId, item]) => ({
              productId,
              currentStock: item.currentStock,
              minimumRequired: item.minimumStock
            }));
        },

        setInventoryPrice: (productId, price) => {
          set(state => ({
            inventory: {
              ...state.inventory,
              [productId]: {
                ...state.inventory[productId],
                price
              }
            }
          }));
        }
      }),
      {
        name: 'inventory-store'
      }
    )
  )
);
