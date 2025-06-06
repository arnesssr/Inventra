import { apiService } from './apiService';
import type { AuditLog, AuditEventType } from '../types/auditTypes';

export class AuditService {
  private baseUrl = '/api/audits';

  async getAuditLogs(page: number = 1, limit: number = 10): Promise<AuditLog[]> {
    return apiService.get<AuditLog[]>(this.baseUrl, {
      params: { page, limit }
    });
  }

  async getAuditsByEntity(entityType: string, entityId: string): Promise<AuditLog[]> {
    return apiService.get<AuditLog[]>(`${this.baseUrl}/entity`, {
      params: { type: entityType, id: entityId }
    });
  }

  async createAuditLog(data: Omit<AuditLog, 'id' | 'timestamp'>): Promise<AuditLog> {
    return apiService.post<AuditLog>(this.baseUrl, data);
  }
}

export const auditService = new AuditService();