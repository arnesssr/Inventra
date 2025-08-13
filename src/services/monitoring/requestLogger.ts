import type { RequestLog } from "@/types/monitoring.types";

export class RequestLogger {
  private static logs: RequestLog[] = [];
  private static maxLogs = 1000;

  static logRequest(log: RequestLog) {
    this.logs.unshift(log);
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }
    this.persistLogs();
  }

  private static persistLogs() {
    // Store in localStorage for development
    localStorage.setItem('request-logs', JSON.stringify(this.logs.slice(0, 100)));
  }

  static getLogs(): RequestLog[] {
    return this.logs;
  }

  static clear() {
    this.logs = [];
    localStorage.removeItem('request-logs');
  }
}
