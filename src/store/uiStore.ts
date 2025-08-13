import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  // Theme and visual preferences
  sidebarOpen: boolean;
  
  // Modal states
  modals: {
    createProduct: boolean;
    createOrder: boolean;
    createSupplier: boolean;
    createCategory: boolean;
    stockMovement: boolean;
  };
  
  // Loading states for UI feedback
  loading: {
    [key: string]: boolean;
  };
  
  // Actions
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  openModal: (modal: keyof UIState['modals']) => void;
  closeModal: (modal: keyof UIState['modals']) => void;
  setLoading: (key: string, loading: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      sidebarOpen: true,
      modals: {
        createProduct: false,
        createOrder: false,
        createSupplier: false,
        createCategory: false,
        stockMovement: false,
      },
      loading: {},
      
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      
      openModal: (modal) => 
        set((state) => ({
          modals: { ...state.modals, [modal]: true }
        })),
        
      closeModal: (modal) =>
        set((state) => ({
          modals: { ...state.modals, [modal]: false }
        })),
        
      setLoading: (key, loading) =>
        set((state) => ({
          loading: { ...state.loading, [key]: loading }
        })),
    }),
    {
      name: 'ui-store',
      partialize: (state) => ({ sidebarOpen: state.sidebarOpen }),
    }
  )
);