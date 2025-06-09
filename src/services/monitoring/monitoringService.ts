import { RequestLogger } from './requestLogger';
import { PerformanceTracker } from './performanceTracker';
import { ErrorReporter } from './errorReporter';
import type { LogLevel } from '../../types/monitoring.types';

export class MonitoringService {
  static logRequest(method: string, url: string, status: number, duration: number, error?: any) {
    RequestLogger.logRequest({
      timestamp: new Date().toISOString(),
      method,
      url,
      status,
      duration,
      error
    });
  }

  static trackPerformance(name: string, callback: () => void, tags?: Record<string, string>) {
    PerformanceTracker.startMeasure(name);
    callback();
    PerformanceTracker.endMeasure(name, tags);
  }

  static reportError(error: Error, context?: Record<string, any>) {
    ErrorReporter.report(error, context);
  }

  static log(level: LogLevel, message: string, data?: any) {
    if (import.meta.env.DEV) {
      console[level](message, data);
    }
    // In production, would send to logging service
  }
}
