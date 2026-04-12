import { api } from '../lib/api';
import type { 
  Payment, 
  CreatePaymentDto, 
  UpdatePaymentDto,
  PaymentStatus
} from '../types';

export const paymentService = {
  async getAll(): Promise<Payment[]> {
    const response = await api.get<Payment[]>('/payment');
    return response.data;
  },

  async getById(id: number): Promise<Payment> {
    const response = await api.get<Payment>(`/payment/${id}`);
    return response.data;
  },

  async create(paymentData: CreatePaymentDto): Promise<Payment> {
    const response = await api.post<Payment>('/payment', paymentData);
    return response.data;
  },

  async update(id: number, paymentData: UpdatePaymentDto): Promise<Payment> {
    const response = await api.patch<Payment>(`/payment/${id}`, paymentData);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/payment/${id}`);
  },

  async getStudentPayments(studentId: number): Promise<Payment[]> {
    const response = await api.get<Payment[]>(`/payment/student/${studentId}`);
    return response.data;
  },

  async getPaymentsByStatus(status: PaymentStatus): Promise<Payment[]> {
    const response = await api.get<Payment[]>(`/payment/status/${status}`);
    return response.data;
  }
};
