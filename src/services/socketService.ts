import { io, Socket } from 'socket.io-client';
import { getCurrentConfig } from '../config/environment';
import type { InventoryUpdateEvent } from '../types/socket.types';

class SocketService {
  private socket: Socket | null = null;
  
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
      console.log('Socket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    this.socket.on('connect_error', (error: any) => {
      console.error('Socket connection error:', error);
    });
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