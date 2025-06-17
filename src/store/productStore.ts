import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { 
  Product, 
  ProductInput, 
  ProductUpdate, 
  ProductVariant 
} from '../types/productTypes';

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  // Store actions
  addProduct: (product: ProductInput) => Promise<Product>;
  updateProduct: (id: string, updates: ProductUpdate) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  publishProduct: (id: string) => Promise<void>;
  archiveProduct: (id: string) => Promise<void>;
  restoreProduct: (id: string) => Promise<void>;
  getCategoryProducts: (categoryId: string) => Product[];
  clearError: () => void;
}

export const useProductStore = create<ProductState>()(
  devtools(
    persist(
      (set, get) => ({
        products: [],
        isLoading: false,
        error: null,
        getDraftCount: () => {
          return get().products.filter(p => p.status === 'draft').length;
        },

        addProduct: async (input) => {
          set({ isLoading: true, error: null });
          try {
            const id = crypto.randomUUID();
            const newProduct: Product = {
              ...input,
              id,
              createdAt: new Date().toISOString(),
              variants: input.hasVariations 
                ? input.variants.map(v => ({
                    ...v,
                    id: crypto.randomUUID(),
                    productId: id,
                    status: 'active'
                  } satisfies ProductVariant))
                : [],
              status: 'draft'
            };

            set(state => ({
              products: [...state.products, newProduct],
              isLoading: false
            }));

            return newProduct;
          } catch (error) {
            set({ error: 'Failed to create product', isLoading: false });
            throw error;
          }
        },

        updateProduct: async (id, updates) => {
          const previousState = get().products;
          try {
            set(state => ({
              products: state.products.map(product => 
                product.id === id
                  ? {
                      ...product,
                      ...updates,
                      variants: updates.variants
                        ? updates.variants.map(v => ({
                            ...v,
                            productId: id,
                            status: v.status || 'active'
                          } satisfies ProductVariant))
                        : product.variants,
                      updatedAt: new Date().toISOString()
                    }
                  : product
              )
            }));
          } catch (error) {
            set({ products: previousState, error: 'Failed to update product' });
            throw error;
          }
        },

        deleteProduct: async (id) => {
          const previousState = get().products;
          try {
            set(state => ({
              products: state.products.filter(p => p.id !== id)
            }));
          } catch (error) {
            set({ products: previousState, error: 'Failed to delete product' });
            throw error;
          }
        },

        publishProduct: async (id) => {
          const previousState = get().products;
          try {
            set(state => ({
              products: state.products.map(p =>
                p.id === id
                  ? {
                      ...p,
                      status: 'published',
                      publishedAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString()
                    }
                  : p
              )
            }));
          } catch (error) {
            set({ products: previousState, error: 'Failed to publish product' });
            throw error;
          }
        },

        archiveProduct: async (id) => {
          const previousState = get().products;
          try {
            set(state => ({
              products: state.products.map(p =>
                p.id === id
                  ? {
                      ...p,
                      status: 'archived',
                      archivedAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString()
                    }
                  : p
              )
            }));
          } catch (error) {
            set({ products: previousState, error: 'Failed to archive product' });
            throw error;
          }
        },

        restoreProduct: async (id) => {
          const previousState = get().products;
          try {
            set(state => ({
              products: state.products.map(p =>
                p.id === id
                  ? {
                      ...p,
                      status: 'draft',
                      archivedAt: undefined,
                      updatedAt: new Date().toISOString()
                    }
                  : p
              )
            }));
          } catch (error) {
            set({ products: previousState, error: 'Failed to restore product' });
            throw error;
          }
        },

        getCategoryProducts: (categoryId) => {
          return get().products.filter(p => p.category === categoryId);
        },

        clearError: () => set({ error: null })
      }),
      {
        name: 'product-store'
      }
    ),
    {
      name: 'ProductStore',
      anonymousActionType: 'ProductStore/anonymous',
      serialize: {
        options: {
          ignoreState: ['isLoading', 'error']
        }
      }
    }
  )
);
