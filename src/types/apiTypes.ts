export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ProductApiResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categoryId: string;
  status: 'draft' | 'published' | 'archived';
  publishedToStorefront: boolean;
  variations?: Array<{
    name: string;
    options: string[];
  }>;
  createdAt: string;
  updatedAt: string;
}
