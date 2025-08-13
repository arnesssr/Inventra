import { useState, useEffect, useCallback } from 'react';
import { socketService } from "@/services/websocket/socketService";
import type { 
  SocketConnectionState, 
  SocketEventType, 
  SocketEvent,
  EventMap,
  EventHandler
} from "@/types/socket.types";

export function useSocket() {
  const [connectionState, setConnectionState] = useState<SocketConnectionState>('disconnected');
  const [lastEvent, setLastEvent] = useState<SocketEvent | null>(null);

  useEffect(() => {
    const handleConnectionChange: EventHandler<'connectionChange'> = (state) => {
      setConnectionState(state);
    };

    const handleEvent: EventHandler<'event'> = (event) => {
      setLastEvent(event);
    };

    socketService.on('connectionChange', handleConnectionChange);
    socketService.on('event', handleEvent);
    
    // Connect on mount
    socketService.connect();

    return () => {
      // Disconnect on unmount
      socketService.off('connectionChange', handleConnectionChange);
      socketService.off('event', handleEvent);
      socketService.disconnect();
    };
  }, []);

  const subscribe = useCallback((eventType: SocketEventType, handler: (data: any) => void) => {
    socketService.subscribe(eventType, handler);
    return () => socketService.unsubscribe(eventType, handler);
  }, []);

  const emit = useCallback((eventType: SocketEventType, data: any) => {
    socketService.emit(eventType, data);
  }, []);

  return {
    connectionState,
    lastEvent,
    subscribe,
    emit,
    connect: socketService.connect.bind(socketService),
    disconnect: socketService.disconnect.bind(socketService)
  };
}