export type WebhookEventType = 
  | 'inventory.updated'
  | 'product.published'
  | 'product.updated'
  | 'order.created'
  | 'order.updated';

export interface WebhookEvent {
  type: WebhookEventType;
  timestamp: string;
  data: Record<string, any>;
}

export interface WebhookPayload<T = any> {
  type: WebhookEventType;
  data: T;
  timestamp: string;
  signature: string;
}

export interface InventoryUpdatePayload {
  productId: string;
  adjustment: number;
  reason?: string;
}

export interface ProductPublishPayload {
  productId: string;
  publishedAt: string;
}

export interface OrderCreatePayload {
  orderId: string;
  total: number;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}
