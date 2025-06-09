// Socket Connection States
export type SocketConnectionState = 'connected' | 'disconnected' | 'connecting' | 'reconnecting' | 'error';

// Socket Configuration Interface
export interface SocketConfig {
  url: string;
  reconnectionAttempts: number;
  reconnectionDelay: number;
  heartbeatInterval?: number;
}

// Socket Event Types
export type SocketEventType = 
  | 'inventory_update'
  | 'order_created'
  | 'product_published'
  | 'stock_alert';

// Socket Event Interface
export interface SocketEvent {
  type: SocketEventType;
  payload: any;
  timestamp: string;
}

// Inventory Update Event Interface
export interface InventoryUpdateEvent {
  productId: string;
  currentStock: number;
  updatedAt: string;
}

// Order Event Interface
export interface OrderEvent {
  orderId: string;
  productId: string;
  quantity: number;
  status: string;
  createdAt: string;
}

// Product Published Event Interface
export interface ProductEvent {
  productId: string;
  title: string;
  description: string;
  price: number;
  publishedAt: string;
}

// Stock Alert Event Interface
export interface StockAlertEvent {
  productId: string;
  threshold: number;
  currentStock: number;
}

// Event Mapping Interface
export type EventMap = {
  connectionChange: SocketConnectionState;
  event: SocketEvent;
  inventory_update: InventoryUpdateEvent;
  order_created: OrderEvent;
  product_published: ProductEvent;
  stock_alert: StockAlertEvent;
  [key: string]: any;
}

// Event Handler Type
export type EventHandler<T extends keyof EventMap> = (data: EventMap[T]) => void;