export type ProductStatus = 'draft' | 'published' | 'archived';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
  status: ProductStatus;
  hasVariations: boolean;
  variants: ProductVariant[];
  imageUrls?: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  price: number;
  stock: number;
  sku: string;
  combination: Record<string, string>;
}

export type ProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
