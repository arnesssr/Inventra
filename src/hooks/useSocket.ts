import { useState, useEffect } from 'react';
import { socketService } from '../services/socketService';
import type { SocketConnectionState } from '../types/socket.types';

export function useSocket() {
  const [connectionState, setConnectionState] = useState<SocketConnectionState>('disconnected');

  useEffect(() => {
    // Connect on mount
    socketService.connect();

    return () => {
      // Disconnect on unmount
      socketService.disconnect();
    };
  }, []);

  return {
    connectionState,
    subscribeToInventory: socketService.subscribeToInventory.bind(socketService),
    onInventoryUpdate: socketService.onInventoryUpdate.bind(socketService)
  };
}