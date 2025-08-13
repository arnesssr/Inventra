import type { ErrorReport } from "@/types/monitoring.types";

export class ErrorReporter {
  private static errors: ErrorReport[] = [];

  static report(error: Error, context?: Record<string, any>) {
    const errorReport: ErrorReport = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      context
    };

    this.errors.push(errorReport);
    this.sendToAnalytics(errorReport);
  }

  private static sendToAnalytics(error: ErrorReport) {
    // In development, log to console
    if (import.meta.env.DEV) {
      
    }
    // In production, would send to analytics service
  }

  static getErrors(): ErrorReport[] {
    return this.errors;
  }
}
