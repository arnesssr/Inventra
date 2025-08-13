export const EVENT_TYPES = {
  PRODUCT: {
    CREATE: 'product.create',
    UPDATE: 'product.update',
    DELETE: 'product.delete',
    ARCHIVE: 'product.archive',
    PUBLISH_TO_STOREFRONT: 'product.publish_to_storefront',
  },
  INVENTORY: {
    ADJUST: 'inventory.adjust',
    THRESHOLD: 'inventory.threshold_change',
  },
  ORDER: {
    CREATE: 'order.create',
    UPDATE: 'order.update',
    STATUS: 'order.status_change',
  },
  USER: {
    LOGIN: 'user.login',
    LOGOUT: 'user.logout',
  },
  SYSTEM: {
    ERROR: 'system.error',
    TASK: 'system.task',
    JOB: 'system.job',
  },
  SECURITY: {
    LOGIN: 'security.login',
    PERMISSIONS_CHANGE: 'security.permissions_change',
    ROLE_CHANGE: 'security.role_change',
  },
  DATA: {
    CREATE: 'data.create',
    UPDATE: 'data.update',
    DELETE: 'data.delete',
  },
  BUSINESS: {
    ORDERS: 'business.orders',
    INVENTORY: 'business.inventory',
    SUPPLIERS: 'business.suppliers',
  },
} as const

type ValueOf<T> = T[keyof T]
type EventValues<T> = {
  [K in keyof T]: T[K] extends { [s: string]: string } ? ValueOf<T[K]> : never
}[keyof T]

export type AuditEventType = 
  | 'product.create'
  | 'product.update'
  | 'product.delete'
  | 'product.publish_to_storefront'
  | 'inventory.adjust'
  | 'inventory.threshold_change'
  | 'order.create'
  | 'order.status_change';

export type AuditSeverity = 'info' | 'warning' | 'critical';

export interface AuditLog {
  id: string;
  timestamp: string;
  eventType: AuditEventType;
  userId: string;
  userName: string;
  details: string;
  severity: AuditSeverity;
  metadata?: Record<string, any>;
}
