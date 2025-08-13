import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Supplier } from "@/types/supplierTypes";

interface PurchaseOrder {
  id: string;
  supplierId: string;
  orderNumber: string;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

interface SupplierStore {
  suppliers: Supplier[];
  purchaseOrders: PurchaseOrder[]; // Add this
  addSupplier: (supplier: Supplier) => void;
  updateSupplier: (id: string, updates: Partial<Supplier>) => void;
  deleteSupplier: (id: string) => void;
  // Add purchase order methods
  createPurchaseOrder: (order: PurchaseOrder) => void;
  updatePurchaseOrder: (id: string, updates: Partial<PurchaseOrder>) => void;
  deletePurchaseOrder: (id: string) => void;
  getSupplierStats: () => {
    totalSuppliers: number;
    activeSuppliers: number;
    totalPurchaseOrders: number;
    pendingOrders: number;
  };
}

export const useSupplierStore = create<SupplierStore>()(
  devtools(
    persist(
      (set, get) => ({
        suppliers: [],
        purchaseOrders: [], // Initialize empty array

        addSupplier: (supplier) =>
          set((state) => ({
            suppliers: [...state.suppliers, supplier]
          })),

        updateSupplier: (id, updates) =>
          set((state) => ({
            suppliers: state.suppliers.map((s) =>
              s.id === id ? { ...s, ...updates } : s
            )
          })),

        deleteSupplier: (id) =>
          set((state) => ({
            suppliers: state.suppliers.filter((s) => s.id !== id)
          })),

        getSupplier: (id) => {
          return get().suppliers.find((s) => s.id === id);
        },

        createPurchaseOrder: (order) =>
          set((state) => ({
            purchaseOrders: [...state.purchaseOrders, order]
          })),

        updatePurchaseOrder: (id, updates) =>
          set((state) => ({
            purchaseOrders: state.purchaseOrders.map((order) =>
              order.id === id ? { ...order, ...updates } : order
            )
          })),

        deletePurchaseOrder: (id) =>
          set((state) => ({
            purchaseOrders: state.purchaseOrders.filter((order) => order.id !== id)
          })),

        getSupplierStats: () => {
          const totalSuppliers = get().suppliers.length;
          const activeSuppliers = get().suppliers.filter((s) => s.isActive).length;
          const totalPurchaseOrders = get().purchaseOrders.length;
          const pendingOrders = get().purchaseOrders.filter((order) => order.status === 'pending').length;

          return {
            totalSuppliers,
            activeSuppliers,
            totalPurchaseOrders,
            pendingOrders
          };
        }
      }),
      {
        name: 'supplier-store'
      }
    )
  )
);
