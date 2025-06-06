import { apiService } from './apiService';
import type { Supplier } from '../types/supplierTypes';

export class SupplierService {
  private baseUrl = '/api/suppliers';

  async getSuppliers(): Promise<Supplier[]> {
    return apiService.get<Supplier[]>(this.baseUrl);
  }

  async createSupplier(data: Omit<Supplier, 'id'>): Promise<Supplier> {
    return apiService.post<Supplier>(this.baseUrl, data);
  }

  async updateSupplier(id: string, data: Partial<Supplier>): Promise<Supplier> {
    return apiService.put<Supplier>(`${this.baseUrl}/${id}`, data);
  }
}

export const supplierService = new SupplierService();
