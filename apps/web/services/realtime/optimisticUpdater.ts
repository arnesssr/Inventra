import type { OptimisticUpdate } from "@/types/realtime.types";

export class OptimisticUpdater<T> {
  private updates = new Map<string, OptimisticUpdate<T>>();

  apply(id: string, update: Partial<T>, currentData: T): T {
    const optimisticUpdate: OptimisticUpdate<T> = {
      id,
      timestamp: new Date().toISOString(),
      data: update,
      rollback: () => this.rollback(id)
    };

    this.updates.set(id, optimisticUpdate);
    return { ...currentData, ...update };
  }

  confirm(id: string) {
    this.updates.delete(id);
  }

  rollback(id: string): T | null {
    const update = this.updates.get(id);
    if (!update) return null;

    this.updates.delete(id);
    return update.data as T;
  }

  getPending(): OptimisticUpdate<T>[] {
    return Array.from(this.updates.values());
  }
}
