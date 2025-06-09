import type { SocketConfig, SocketConnectionState } from '../../types/socket.types';
import { EventEmitter } from 'events';

export class WebSocketManager extends EventEmitter {
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private state: SocketConnectionState = 'disconnected';
  
  constructor(private config: SocketConfig) {
    super();
  }

  connect() {
    try {
      this.state = 'connecting';
      this.socket = new WebSocket(this.config.url);
      this.setupEventListeners();
      this.startHeartbeat();
    } catch (error) {
      this.handleError(error);
    }
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.onopen = () => {
      this.state = 'connected';
      this.reconnectAttempts = 0;
      this.emit('connected');
    };

    this.socket.onclose = () => {
      this.state = 'disconnected';
      this.handleReconnect();
      this.emit('disconnected');
    };

    this.socket.onerror = (error) => {
      this.state = 'error';
      this.handleError(error);
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.emit('message', data);
      } catch (error) {
        this.handleError(error);
      }
    };
  }

  private startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      if (this.state === 'connected') {
        this.send('ping');
      }
    }, 30000); // 30 second heartbeat
  }

  private handleReconnect() {
    if (this.reconnectAttempts >= this.config.reconnectionAttempts) {
      this.emit('reconnect_failed');
      return;
    }

    this.state = 'reconnecting';
    this.reconnectAttempts++;
    this.emit('reconnecting', this.reconnectAttempts);

    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, this.config.reconnectionDelay * this.reconnectAttempts);
  }

  send(data: any) {
    if (this.state !== 'connected') {
      throw new Error('Socket not connected');
    }
    this.socket?.send(JSON.stringify(data));
  }

  private handleError(error: any) {
    this.emit('error', error);
    console.error('WebSocket error:', error);
  }

  disconnect() {
    this.socket?.close();
    if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.state = 'disconnected';
  }

  getState(): SocketConnectionState {
    return this.state;
  }
}
