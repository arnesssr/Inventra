export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  status: 'draft' | 'published' | 'archived';
  stock: number;
  images: ImageWithPreview[];
  imageUrls: string[];
  publishedToStorefront?: boolean;
  archivedAt?: string;
  updatedAt: string;
  createdAt: string;
}

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
