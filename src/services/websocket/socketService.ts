import { io, Socket } from 'socket.io-client';
import { getCurrentConfig } from '../../config/environment';
import type { 
  SocketConnectionState,
  EventMap,
  EventHandler,
  InventoryUpdateEvent
} from '../../types/socket.types';

class SocketService {
  unsubscribe(eventType: string, handler: (data: any) => void): any {
    throw new Error('Method not implemented.');
  }
  subscribe(eventType: string, handler: (data: any) => void) {
    throw new Error('Method not implemented.');
  }
  private socket: Socket | null = null;
  private handlers: Map<keyof EventMap, EventHandler<keyof EventMap>[]> = new Map();

  // Type-safe event handling
  on<T extends keyof EventMap>(event: T, handler: EventHandler<T>) {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, []);
    }
    const handlers = this.handlers.get(event)!;
    handlers.push(handler as EventHandler<keyof EventMap>);

    // Bridge between Socket.IO and our typed system
    this.socket?.on(String(event), (data: any) => {
      handlers.forEach(h => h(data));
    });
  }

  off<T extends keyof EventMap>(event: T, handler: EventHandler<T>) {
    const handlers = this.handlers.get(event) || [];
    this.handlers.set(event, 
      handlers.filter(h => h !== handler)
    );
    
    // Remove Socket.IO listener if no handlers remain
    if (this.handlers.get(event)?.length === 0) {
      this.socket?.off(String(event));
    }
  }

  emit<T extends keyof EventMap>(event: T, data: EventMap[T]) {
    if (!this.socket?.connected) {
      throw new Error('Socket not connected');
    }
    this.socket.emit(String(event), data);
  }

  connect() {
    const config = getCurrentConfig();
    
    this.socket = io(String(config.wsUrl), {
      path: config.socketPath,
      timeout: config.socketTimeout,
      auth: {
        token: config.apiKey
      }
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      this.notifyHandlers('connectionChange', 'connected');
    });

    this.socket.on('disconnect', () => {
      this.notifyHandlers('connectionChange', 'disconnected');
    });

    this.socket.on('connect_error', (error: any) => {
      console.error('Socket connection error:', error);
      this.notifyHandlers('connectionChange', 'error');
    });
  }

  private notifyHandlers<T extends keyof EventMap>(event: T, data: EventMap[T]) {
    const handlers = this.handlers.get(event) || [];
    handlers.forEach(handler => handler(data));
  }

  subscribeToInventory(productId: string) {
    this.socket?.emit('subscribe_inventory', productId);
  }

  onInventoryUpdate(callback: (data: InventoryUpdateEvent) => void) {
    this.socket?.on('inventory_update', callback);
  }

  disconnect() {
    this.socket?.disconnect();
  }
}

export const socketService = new SocketService();

// Configuration is imported from environment.ts