import type { ConflictResolution } from '../../types/realtime.types';

export class ConflictResolver<T> {
  resolve(local: T, server: T, strategy: ConflictResolution<T>['strategy']): T {
    switch (strategy) {
      case 'client-wins':
        return local;
      case 'server-wins':
        return server;
      case 'manual':
        return this.mergeData(local, server);
    }
  }

  private mergeData(local: T, server: T): T {
    // Implement custom merge logic based on data type
    return {
      ...server,
      ...local,
      updatedAt: new Date().toISOString()
    };
  }

  detectConflicts(local: T, server: T): boolean {
    const localVersion = (local as any).version;
    const serverVersion = (server as any).version;
    return localVersion !== serverVersion;
  }
}
