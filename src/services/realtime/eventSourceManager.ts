import { EventEmitter } from 'events';
import type { EventSourceConfig, EventSourceType } from "@/types/realtime.types";

export class EventSourceManager extends EventEmitter {
  private events: Array<{ type: string; data: any; timestamp: string }> = [];
  private connected = false;
  private retryCount = 0;

  constructor(private config: EventSourceConfig) {
    super();
  }

  connect() {
    switch (this.config.type) {
      case 'websocket':
        this.connectWebSocket();
        break;
      case 'server-sent':
        this.connectSSE();
        break;
      case 'polling':
        this.startPolling();
        break;
    }
  }

  private connectWebSocket() {
    // Use existing WebSocket implementation
  }

  private connectSSE() {
    const eventSource = new EventSource(this.config.url);
    
    eventSource.onmessage = (event) => {
      this.handleEvent(JSON.parse(event.data));
    };

    eventSource.onerror = this.handleError.bind(this);
  }

  private startPolling() {
    setInterval(async () => {
      try {
        const response = await fetch(this.config.url);
        const data = await response.json();
        this.handleEvent(data);
      } catch (error) {
        this.handleError(error);
      }
    }, 3000);
  }

  private handleEvent(event: any) {
    this.events.push({
      type: event.type,
      data: event.data,
      timestamp: new Date().toISOString()
    });
    this.emit('event', event);
  }

  private handleError(error: any) {
    if (this.retryCount < this.config.maxRetries) {
      this.retryCount++;
      setTimeout(() => {
        this.connect();
      }, this.config.reconnectDelay * this.retryCount);
    } else {
      this.emit('error', error);
    }
  }

  getEventHistory() {
    return this.events;
  }
}
