import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { AuditEventType, AuditLog, AuditSeverity } from "@/types/auditTypes";

interface AuditStore {
  logs: AuditLog[];
  addLog: (log: AuditLog) => void;
  addAuditLog: (event: {
    eventType: AuditEventType;
    userId: string;
    details: string;
    severity: AuditSeverity;
    metadata?: Record<string, any>;
  }) => AuditLog;
  getLogs: (filters?: {
    eventType?: AuditEventType;
    severity?: AuditSeverity;
    startDate?: Date;
    endDate?: Date;
  }) => AuditLog[];
  setLogs: (logs: AuditLog[]) => void;
  getStats: () => {
    totalEvents: number;
    criticalEvents: number;
    warningEvents: number;
    infoEvents: number;
  };
}

export const useAuditStore = create<AuditStore>()(
  devtools(
    persist(
      (set, get) => ({
        logs: [],
        
        addLog: (log) => set(state => ({ 
          logs: [log, ...state.logs] 
        })),

        addAuditLog: (event) => {
          const log: AuditLog = {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            eventType: event.eventType,
            userId: event.userId,
            userName: event.metadata?.userName || 'System',
            details: event.details,
            severity: event.severity,
            metadata: event.metadata
          };

          set(state => ({
            logs: [log, ...state.logs]
          }));

          return log;
        },

        getLogs: (filters) => {
          const logs = get().logs;
          if (!filters) return logs;

          return logs.filter(log => {
            const matchesEventType = !filters.eventType || log.eventType === filters.eventType;
            const matchesSeverity = !filters.severity || log.severity === filters.severity;
            const matchesDateRange = 
              (!filters.startDate || new Date(log.timestamp) >= filters.startDate) &&
              (!filters.endDate || new Date(log.timestamp) <= filters.endDate);
            
            return matchesEventType && matchesSeverity && matchesDateRange;
          });
        },

        setLogs: (logs) => set({ logs }),

        getStats: () => {
          const logs = get().logs;
          return {
            totalEvents: logs.length,
            criticalEvents: logs.filter(log => log.severity === 'critical').length,
            warningEvents: logs.filter(log => log.severity === 'warning').length,
            infoEvents: logs.filter(log => log.severity === 'info').length
          };
        }
      }),
      {
        name: 'audit-store'
      }
    )
  )
);
