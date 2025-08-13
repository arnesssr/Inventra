import { API_CONFIG } from "@/config/apiConfig";

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export class CacheManager {
  private cache = new Map<string, CacheEntry<any>>();

  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > API_CONFIG.cacheTimeout;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  invalidate(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

export const cacheManager = new CacheManager();
