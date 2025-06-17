export type ProductStatus = 'draft' | 'published' | 'archived';
export type VariantStatus = 'active' | 'inactive';

export interface BaseProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
  status: ProductStatus;
  imageUrls?: string[];
  createdAt: string;
  updatedAt?: string;
  publishedAt?: string;
  archivedAt?: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  price: number;
  stock: number;
  sku: string;
  status: VariantStatus;
  combination: Record<string, string>;
}

export interface Product extends BaseProduct {
  hasVariations: boolean;
  variants: ProductVariant[];
}

export type ProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt' | 'archivedAt'>;
export type ProductUpdate = Partial<ProductInput>;

export interface ImageWithPreview {
  file: File;
  previewUrl: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  fields: CategoryField[];
}

export interface CategoryField {
  name: string;
  type: 'text' | 'select' | 'number';
  label: string;
  required: boolean;
  options?: string[];
}

export interface StockMovement {
  id: string;
  productId: string;
  quantity: number;
  type: 'increase' | 'decrease';
  reason: 'purchase' | 'sale' | 'adjustment' | 'return';
  date: string;
  notes?: string;
}
