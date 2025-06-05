export type WebhookEventType = 
  | 'product.updated'
  | 'product.published'
  | 'inventory.updated'
  | 'order.created'
  | 'order.updated';

export interface WebhookPayload<T = any> {
  type: WebhookEventType;
  data: T;
  timestamp: string;
  signature: string;
}
