export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export interface RequestLog {
  timestamp: string;
  method: string;
  url: string;
  duration: number;
  status: number;
  error?: any;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: string;
  tags?: Record<string, string>;
}

export interface ErrorReport {
  message: string;
  stack?: string;
  timestamp: string;
  context?: Record<string, any>;
}
