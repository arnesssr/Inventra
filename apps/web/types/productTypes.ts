export interface ProductVariant {
  id: string;
  productId: string;
  price: number;
  stock: number;
  sku: string;
  status: 'active' | 'inactive';
  combination: Record<string, string>;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
  status: 'draft' | 'published' | 'archived';
  hasVariations: boolean;
  variants: ProductVariant[];
  imageUrls?: string[];
  createdAt: string;
  updatedAt?: string;
}
export interface Product extends BaseProduct {
  id: string;
  createdAt: string;
  publishedAt?: string;
}

export type CreateProductInput = Omit<BaseProduct, 'imageUrls'> & {
  imageUrls?: string[]; // Allow optional for creation
};
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
  reason: 'purchase' | 'sale' | 'adjustment' | 'return';
  date: string;
  notes?: string;
}
