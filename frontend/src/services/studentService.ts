import { api } from '../lib/api';
import type { 
  Student, 
  CreateStudentDto, 
  UpdateStudentDto, 
  Enrollment,
  Payment,
  Schedule,
  Progress 
} from '../types';

export const studentService = {
  async getAll(): Promise<Student[]> {
    const response = await api.get<Student[]>('/student');
    return response.data;
  },

  async getById(id: number): Promise<Student> {
    const response = await api.get<Student>(`/student/${id}`);
    return response.data;
  },

  async getByEmail(email: string): Promise<Student> {
    const response = await api.get<Student>(`/student/email/${email}`);
    return response.data;
  },

  async create(studentData: CreateStudentDto): Promise<Student> {
    const response = await api.post<Student>('/student', studentData);
    return response.data;
  },

  async update(id: number, studentData: UpdateStudentDto): Promise<Student> {
    const response = await api.patch<Student>(`/student/${id}`, studentData);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/student/${id}`);
  },

  async getEnrollments(studentId: number): Promise<Enrollment[]> {
    const response = await api.get<Enrollment[]>(`/enrollment/student/${studentId}`);
    return response.data;
  },

  async getPayments(studentId: number): Promise<Payment[]> {
    const response = await api.get<Payment[]>(`/payment/student/${studentId}`);
    return response.data;
  },

  async getSchedules(studentId: number): Promise<Schedule[]> {
    const response = await api.get<Schedule[]>(`/schedule/student/${studentId}`);
    return response.data;
  },

  async getProgress(studentId: number): Promise<Progress[]> {
    const response = await api.get<Progress[]>(`/progress/student/${studentId}`);
    return response.data;
  },

  async getCourseProgress(studentId: number, courseId: number): Promise<Progress[]> {
    const response = await api.get<Progress[]>(`/progress/student/${studentId}/course/${courseId}`);
    return response.data;
  }
};
