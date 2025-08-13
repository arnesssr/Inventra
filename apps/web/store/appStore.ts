import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Consolidated app state
interface AppState {
  // UI State
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  
  // Auth State
  user: User | null;
  isAuthenticated: boolean;
  
  // Data State
  products: Product[];
  orders: Order[];
  suppliers: Supplier[];
  
  // Loading States
  loading: {
    products: boolean;
    orders: boolean;
    suppliers: boolean;
  };
  
  // Actions
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setUser: (user: User | null) => void;
  setProducts: (products: Product[]) => void;
  setOrders: (orders: Order[]) => void;
  setSuppliers: (suppliers: Supplier[]) => void;
  setLoading: (key: keyof AppState['loading'], loading: boolean) => void;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  status: 'active' | 'inactive' | 'draft';
}

interface Order {
  id: string;
  customerName: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
}

export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      // Initial state
      sidebarOpen: true,
      theme: 'system',
      user: null,
      isAuthenticated: false,
      products: [],
      orders: [],
      suppliers: [],
      loading: {
        products: false,
        orders: false,
        suppliers: false,
      },
      
      // Actions
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setTheme: (theme) => set({ theme }),
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setProducts: (products) => set({ products }),
      setOrders: (orders) => set({ orders }),
      setSuppliers: (suppliers) => set({ suppliers }),
      setLoading: (key, loading) => 
        set((state) => ({
          loading: { ...state.loading, [key]: loading }
        })),
    }),
    { name: 'app-store' }
  )
);