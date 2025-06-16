import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { productService } from '../services/productService';

// Add ProductVariant interface
interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  stock: number;
  combination: Record<string, string>;
}

// Move interfaces to the top for better organization
export interface ImageWithPreview {
  file: File;
  previewUrl: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  categoryName?: string;
  status: 'draft' | 'published' | 'archived';
  stock: number;
  imageUrls: string[];
  images: ImageWithPreview[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  archivedAt?: string;
  published_to_storefront?: boolean;
  sku?: string;
  hasVariations?: boolean;
  variants?: Array<{
    id: string;
    sku: string;
    price: number;
    stock: number;
    combination: Record<string, string>;
  }>;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductState {
  isLoading?: boolean;
  error?: string;
  products: Product[];
  categories: Category[];
  updateProductStatus: (productId: string, status: Product['status']) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getProductsByStatus: (status: 'draft' | 'published' | 'archived') => Product[];
  archiveProduct: (id: string) => void;
  restoreProduct: (id: string) => void;
  adjustProductStock: (id: string, adjustment: number) => void;
  // Add async methods
  createProductAsync: (data: Product) => Promise<Product>;
  updateProductAsync: (id: string, data: Partial<Product>) => Promise<Product>;
  publishProductAsync: (id: string) => Promise<void>;
  publishProduct: (productId: string) => Promise<void>;
  unpublishProduct: (productId: string) => Promise<void>;
  getCategoryName: (id: string) => string;
  getTotalValue: () => number;
  getDraftCount: () => number;
  getPublishedCount: () => number;
  getArchivedCount: () => number;
  getStats: () => {
    totalProducts: number;
    totalValue: number;
    draftsCount: number;
    publishedCount: number;
  };
  getRecentChanges: () => Array<Product & { updatedAt: string }>;
  createProduct: (product: Omit<Product, 'id'>) => Promise<Product>;
  generateSKU: (categoryId: string, name: string, variant?: Record<string, string>) => string;
  handleImageUpdates: (productId: string, images: ImageWithPreview[]) => string[];
  createVariant: (productId: string, variantData: Omit<ProductVariant, 'id'>) => void;
  updateVariant: (productId: string, variantId: string, updates: Partial<ProductVariant>) => void;
  deleteVariant: (productId: string, variantId: string) => void;
}

// Create and export the store hook
export const useProductStore = create<ProductState>()(
  persist(
    (set, get): ProductState => ({
      products: [],
      categories: [],

      updateProductStatus: (productId: string, status: Product['status']) => set((state) => ({
        products: state.products.map((product) => product.id === productId
          ? {
            ...product,
            status,
            updatedAt: new Date().toISOString(),
            ...(status === 'published' && { publishedAt: new Date().toISOString() }),
            ...(status === 'archived' && { archivedAt: new Date().toISOString() })
          }
          : product
        )
      })),

      addProduct: async (product) => {
        try {
          set({ isLoading: true });
          const createdProduct = await productService.createProduct(product);
          set(state => ({
            products: [...state.products, createdProduct],
            isLoading: false
          }));
          return createdProduct;
        } catch (error) {
          set({ isLoading: false, error: error instanceof Error ? error.message : 'An unknown error occurred' });
          throw error;
        }
      },

      updateProduct: async (id, updates) => {
        try {
          set({ isLoading: true });
          const updatedProduct = await productService.updateProduct(id, updates);
          set(state => ({
            products: state.products.map(p => p.id === id ? updatedProduct : p),
            isLoading: false
          }));
          return updatedProduct;
        } catch (error) {
          set({ isLoading: false, error: error instanceof Error ? error.message : 'An unknown error occurred' });
          throw error;
        }
      },

      deleteProduct: (id) => set((state) => ({
        products: state.products.filter((p) => p.id !== id)
      })),

      getProduct: (id) => {
        return get().products.find((p) => p.id === id);
      },

      getProductsByCategory: (category) => {
        return get().products.filter((p) => p.category === category);
      },

      getProductsByStatus: (status) => {
        return get().products.filter((p) => p.status === status);
      },

      archiveProduct: (id: string) => set((state) => ({
        products: state.products.map((product) => product.id === id
          ? {
            ...product,
            status: 'archived',
            archivedAt: new Date().toISOString()
          }
          : product
        )
      })),

      restoreProduct: (id: string) => set((state) => ({
        products: state.products.map((product) => product.id === id
          ? {
            ...product,
            status: 'published',
            archivedAt: undefined
          }
          : product
        )
      })),

      adjustProductStock: (id: string, adjustment: number) => set((state) => ({
        products: state.products.map((product) => product.id === id
          ? {
            ...product,
            stock: Math.max(0, product.stock + adjustment),
            updatedAt: new Date().toISOString()
          }
          : product
        )
      })),

      // Async methods
      createProductAsync: async (data: Product) => {
        try {
          const response = await productService.createProduct(data);
          set(state => ({
            products: [...state.products, response]
          }));
          return response;
        } catch (error) {
          console.error('Failed to create product:', error);
          throw error;
        }
      },

      updateProductAsync: async (id: string, data: Partial<Product>) => {
        try {
          const response = await productService.updateProduct(id, data);
          set(state => ({
            products: state.products.map(p => p.id === id ? { ...p, ...response } : p
            )
          }));
          return response;
        } catch (error) {
          console.error('Failed to update product:', error);
          throw error;
        }
      },

      publishProductAsync: async (id) => {
        await productService.publishProduct(id);
        set(state => ({
          products: state.products.map(p => p.id === id ? { ...p, status: 'published' } : p
          )
        }));
      },

      publishProduct: async (id: string) => {
        set(state => ({
          products: state.products.map(p => p.id === id ? {
            ...p,
            status: 'published',
            publishedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          } : p
          )
        }));
      },

      unpublishProduct: async (productId: string) => {
        set(state => ({
          products: state.products.map(p => p.id === productId
            ? {
              ...p,
              status: 'draft',
              publishedAt: undefined,
              publishedToStorefront: false
            }
            : p
          )
        }));

        // Add API call here if needed
        await productService.unpublishFromStorefront(productId);
      },

      getCategoryName: (id: string) => {
        const product = get().products.find(p => p.category === id);
        return product?.categoryName || id;
      },

      getTotalValue: () => {
        return get().products.reduce((sum, product) => sum + (product.price * product.stock), 0
        );
      },

      getDraftCount: () => {
        return get().products.filter(p => p.status === 'draft').length;
      },

      getPublishedCount: () => {
        return get().products.filter(p => p.status === 'published').length;
      },

      getArchivedCount: () => {
        return get().products.filter(p => p.status === 'archived').length;
      },

      getStats: () => {
        const products = get().products;
        return {
          totalProducts: products.length,
          totalValue: products.reduce((acc, curr) => acc + (curr.price * curr.stock), 0),
          draftsCount: products.filter(p => p.status === 'draft').length,
          publishedCount: products.filter(p => p.status === 'published').length
        };
      },

      getRecentChanges: () => {
        return get().products
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .slice(0, 5);
      },

      createProduct: async (product: Omit<Product, 'id'>) => {
        try {
          const newProduct = await productService.createProduct(product);
          set(state => ({
            products: [...state.products, newProduct]
          }));
          return newProduct;
        } catch (error) {
          console.error('Failed to create product:', error);
          throw error;
        }
      },

      generateSKU: (categoryId, name, variant) => {
        const catPrefix = categoryId.substring(0, 3).toUpperCase();
        const prodCode = name.replace(/\s+/g, '').substring(0, 3).toUpperCase();
        const timestamp = Date.now().toString().slice(-4);

        if (variant) {
          const variantCode = Object.entries(variant)
            .map(([_, value]) => value.substring(0, 2).toUpperCase())
            .join('');
          return `${catPrefix}-${prodCode}-${variantCode}-${timestamp}`;
        }

        return `${catPrefix}-${prodCode}-${timestamp}`;
      },

      handleImageUpdates: (productId, images) => {
        const oldProduct = get().getProduct(productId);
        oldProduct?.imageUrls?.forEach(url => URL.revokeObjectURL(url));
        return images.map(img => URL.createObjectURL(img.file));
      },

      createVariant: (productId, variantData) => {
        set(state => ({
          products: state.products.map(p => p.id === productId ? {
            ...p,
            hasVariations: true,
            variants: [...(p.variants || []), {
              ...variantData,
              id: crypto.randomUUID()
            }]
          } : p
          )
        }));
      },

      updateVariant: (productId, variantId, updates) => {
        set(state => ({
          products: state.products.map(p => p.id === productId ? {
            ...p,
            variants: p.variants?.map(v => v.id === variantId ? { ...v, ...updates } : v
            )
          } : p
          )
        }));
      },

      deleteVariant: (productId, variantId) => {
        set(state => ({
          products: state.products.map(p => p.id === productId ? {
            ...p,
            variants: p.variants?.filter(v => v.id !== variantId),
            hasVariations: (p.variants?.length || 0) > 1
          } : p
          )
        }));
      },
    }),
    {
      name: 'product-store',
      version: 1
    }
  )
);
