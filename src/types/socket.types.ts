export type SocketConnectionState = 'connected' | 'disconnected' | 'connecting' | 'error';

export interface SocketConfig {
  url: string;
  path: string;
  timeout: number;
}

export interface InventoryUpdateEvent {
  productId: string;
  currentStock: number;
  updatedAt: string;
}