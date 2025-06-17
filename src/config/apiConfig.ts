export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
  cacheTimeout: 5 * 60 * 1000, // 5 minutes
  queueConcurrency: 3,
} as const;

export type ApiResponse<T> = {
  data: T;
  status: number;
  headers: Record<string, string>;
  cached?: boolean;
};
