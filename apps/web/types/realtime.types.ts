export type EventSourceType = 'websocket' | 'server-sent' | 'polling';

export interface EventSourceConfig {
  type: EventSourceType;
  url: string;
  reconnectDelay: number;
  maxRetries: number;
}

export interface SyncState<T> {
  localVersion: number;
  serverVersion: number;
  data: T;
  pending: boolean;
  lastSync: string;
}

export interface OptimisticUpdate<T> {
  id: string;
  timestamp: string;
  data: Partial<T>;
  rollback: () => void;
}

export interface ConflictResolution<T> {
  localData: T;
  serverData: T;
  resolved: T;
  strategy: 'client-wins' | 'server-wins' | 'manual';
}

export type SyncStatus = 'synced' | 'syncing' | 'error' | 'conflict';
