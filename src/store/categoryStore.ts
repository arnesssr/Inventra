import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Category, CategoryState, CategoryField, CategoryMetrics } from '../types/categoryTypes';
import { DEFAULT_FIELDS } from '../types/categoryTypes';

const DEFAULT_CATEGORIES: Category[] = [
  { 
    id: 'bibles',
    name: 'Bibles',
    description: 'Holy Bibles in different versions and formats',
    fields: [...DEFAULT_FIELDS],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    parentId: null
  },
  { 
    id: 'books',
    name: 'Books',
    description: 'Christian literature and study materials',
    fields: [...DEFAULT_FIELDS],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    parentId: null
  },
  { 
    id: 'gifts',
    name: 'Gifts & Cards',
    description: 'Gift items and greeting cards for all occasions',
    fields: [...DEFAULT_FIELDS],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    parentId: null
  },
  { 
    id: 'stationery',
    name: 'Stationery',
    description: 'Office and school stationery supplies',
    fields: [...DEFAULT_FIELDS],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    parentId: null
  },
  { 
    id: 'toys',
    name: 'Toys & Games',
    description: 'Fun toys and games for children and adults',
    fields: [...DEFAULT_FIELDS],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    parentId: null
  },
  { 
    id: 'music',
    name: 'Music & Media',
    description: 'Music albums and media content',
    fields: [...DEFAULT_FIELDS],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    parentId: null
  }
];

export const useCategoryStore = create<CategoryState>()(
  devtools(
    persist(
      (set, get) => ({
        categories: DEFAULT_CATEGORIES,

        initializeCategories: () => {
          const state = get();
          // Initialize if categories array is empty or undefined
          if (!state.categories || state.categories.length === 0) {
            set({ categories: DEFAULT_CATEGORIES });
          }
        },

        addCategory: (category) => 
          set((state) => ({
            categories: [...state.categories, { 
              ...category,
              id: `cat-${Date.now()}`,
              parentId: null, // Set default parentId
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }]
          })),

        deleteCategory: (id) =>
          set((state) => ({
            categories: state.categories.filter((c) => c.id !== id)
          })),

        updateCategory: (id, updates) =>
          set((state) => ({
            categories: state.categories.map((c) =>
              c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
            )
          })),

        getCategoryName: (id: string) => {
          const category = get().categories.find(c => c.id === id);
          return category?.name || id;
        },

        getSubcategories: (parentId: string) => {
          return get().categories.filter(c => c.parentId === parentId);
        },

        validateCategory: (category: Partial<Category>) => {
          // Basic validation
          if (!category.name) return false;
          if (category.parentId && !get().categories.find(c => c.id === category.parentId)) {
            return false;
          }
          return true;
        },

        addSubcategory: (parentId, categoryData) => {
          set(state => ({
            categories: [
              ...state.categories,
              {
                ...categoryData,
                id: `cat-${Date.now()}`,
                parentId,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              }
            ]
          }));
        },

        moveCategory: (categoryId: string, newParentId: string | null) => {
          set(state => ({
            categories: state.categories.map(cat =>
              cat.id === categoryId ? { ...cat, parentId: newParentId, updatedAt: new Date().toISOString() } : cat
            )
          }));
        },

        getCategoryMetrics: (categoryId: string) => {
          const category = get().categories.find(c => c.id === categoryId);
          if (!category) return null;

          return {
            productCount: 0, // This needs integration with product store
            subcategoryCount: get().getSubcategories(categoryId).length,
            totalValue: 0, // This needs integration with product store
            lastUpdated: category.updatedAt
          };
        },

        getCategoryHierarchy: () => {
          const buildHierarchy = (parentId: string | null = null): Category[] => {
            return get().categories
              .filter(c => c.parentId === parentId)
              .map(c => ({
                ...c,
                children: buildHierarchy(c.id)
              }));
          };
          return buildHierarchy();
        }      }),      {
        name: 'category-store',
        onRehydrateStorage: () => (state) => {
          // Set defaults if state is empty
          if (!state || !state.categories || state.categories.length === 0) {
            return {
              categories: DEFAULT_CATEGORIES,
              initializeCategories: state?.initializeCategories,
              addCategory: state?.addCategory,
              deleteCategory: state?.deleteCategory,
              updateCategory: state?.updateCategory,
              getCategoryName: state?.getCategoryName,
              getSubcategories: state?.getSubcategories,
              validateCategory: state?.validateCategory,
              addSubcategory: state?.addSubcategory,
              moveCategory: state?.moveCategory,
              getCategoryMetrics: state?.getCategoryMetrics,
              getCategoryHierarchy: state?.getCategoryHierarchy
            };
          }
          return state;
        }
      }
    )
  )
);
