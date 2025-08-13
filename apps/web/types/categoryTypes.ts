export interface CategoryField {
  name: string;
  type: 'text' | 'select' | 'number';
  label: string;
  required: boolean;
  options?: string[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  parentId?: string | null;
  createdAt: string;
  updatedAt: string;
  fields: CategoryField[];
}

export interface CategoryMetrics {
  productCount: number;
  subcategoryCount: number;
  totalValue: number;
  lastUpdated: string;
}

export interface CategoryState {
  categories: Category[];
  initializeCategories: () => void;
  addCategory: (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deleteCategory: (id: string) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  getCategoryName: (id: string) => string;
  getSubcategories: (parentId: string) => Category[];
  validateCategory: (category: Partial<Category>) => boolean;
  addSubcategory: (parentId: string, categoryData: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => void;
  moveCategory: (categoryId: string, newParentId: string | null) => void;
  getCategoryMetrics: (categoryId: string) => CategoryMetrics | null;
  getCategoryHierarchy: () => Category[];
}

// Default fields that every product category will have
export const DEFAULT_FIELDS: CategoryField[] = [
  { name: 'name', type: 'text', label: 'Product Name', required: true },
  { name: 'price', type: 'number', label: 'Price', required: true },
  { name: 'stock', type: 'number', label: 'Stock', required: true },
  { name: 'description', type: 'text', label: 'Description', required: true }
];
