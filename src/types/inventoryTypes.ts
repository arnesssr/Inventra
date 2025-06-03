/**
 * Defines the possible types of stock movements in the inventory system
 * - 'in': Stock additions (purchases, returns)
 * - 'out': Stock removals (sales, damages)
 * - 'adjustment': Manual stock corrections
 */
export type StockMovementType = 'in' | 'out' | 'adjustment';

/**
 * Represents a single stock movement transaction
 */
export interface StockMovement {
  id: string;
  productId: string;
  date: string;
  type: 'in' | 'out';
  quantity: number;
  reason?: string;
}

/**
 * Represents the current inventory state of a product
 */
export interface InventoryItem {
  productId: string;
  currentStock: number;  // This replaces quantity
  minimumStock: number;
  movements?: StockMovement[];
  lastUpdated?: string;
  categoryId?: string;
  productName?: string;
  price: number;  // Add price property
}

/**
 * Types of inventory alerts
 */
export type AlertType = 'low_stock' | 'out_of_stock' | 'reorder_point';

/**
 * Structure for inventory alerts
 */
export interface StockAlert {
  id: string;
  productId: string;
  productName: string;
  type: AlertType;
  threshold: number;
  currentStock: number;
  createdAt: string;
  status: 'active' | 'resolved';
}

/**
 * Represents a stock order in the inventory system
 */
export interface StockOrder {
  id: string;
  productId: string;
  quantity: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  completedAt?: string;
  notes?: string;
}
