// Export all shared types
export * from './productTypes';
export * from './inventoryTypes';
export * from './orderTypes';
export * from './supplierTypes';
export * from './categoryTypes';
export * from './auditTypes';
export * from './apiTypes';
export * from './webhookTypes';
export * from './activityTypes';
export * from './messageTypes';
export * from './variationTypes';

// Common types
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export type Status = 'active' | 'inactive' | 'pending' | 'archived';