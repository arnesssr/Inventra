export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  price: number;
  stock: number;
  combination: Record<string, string>;
  isDefault?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  status: 'draft' | 'published' | 'archived';
  imageUrls?: string[];
  hasVariations: boolean;
  variants: ProductVariant[];
  createdAt: string;
  updatedAt?: string;
  publishedAt?: string;
}

export type CreateProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt'>;
export type UpdateProductInput = Partial<CreateProductInput>;

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
