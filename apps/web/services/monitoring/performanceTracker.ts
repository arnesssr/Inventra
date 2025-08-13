import type { PerformanceMetric } from "@/types/monitoring.types";

export class PerformanceTracker {
  private static metrics: PerformanceMetric[] = [];
  private static marks = new Map<string, number>();

  static startMeasure(name: string) {
    this.marks.set(name, performance.now());
  }

  static endMeasure(name: string, tags?: Record<string, string>) {
    const startTime = this.marks.get(name);
    if (startTime) {
      const duration = performance.now() - startTime;
      this.metrics.push({
        name,
        value: duration,
        timestamp: new Date().toISOString(),
        tags
      });
      this.marks.delete(name);
    }
  }

  static getMetrics(): PerformanceMetric[] {
    return this.metrics;
  }
}
