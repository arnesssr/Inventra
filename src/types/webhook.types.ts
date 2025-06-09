export type WebhookEventType = 
  | 'inventory.updated'
  | 'product.published'
  | 'order.created';

export interface WebhookEvent {
  type: WebhookEventType;
  timestamp: string;
  data: Record<string, any>;
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
