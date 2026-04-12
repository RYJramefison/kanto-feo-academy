import { api } from '../lib/api';
import type { 
  Enrollment, 
  CreateEnrollmentDto, 
  UpdateEnrollmentDto 
} from '../types';

export const enrollmentService = {
  async getAll(): Promise<Enrollment[]> {
    const response = await api.get<Enrollment[]>('/enrollment');
    return response.data;
  },

  async getById(id: number): Promise<Enrollment> {
    const response = await api.get<Enrollment>(`/enrollment/${id}`);
    return response.data;
  },

  async create(enrollmentData: CreateEnrollmentDto): Promise<Enrollment> {
    const response = await api.post<Enrollment>('/enrollment', enrollmentData);
    return response.data;
  },

  async update(id: number, enrollmentData: UpdateEnrollmentDto): Promise<Enrollment> {
    const response = await api.patch<Enrollment>(`/enrollment/${id}`, enrollmentData);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/enrollment/${id}`);
  },

  async getStudentEnrollments(studentId: number): Promise<Enrollment[]> {
    const response = await api.get<Enrollment[]>(`/enrollment/student/${studentId}`);
    return response.data;
  },

  async getCourseEnrollments(courseId: number): Promise<Enrollment[]> {
    const response = await api.get<Enrollment[]>(`/enrollment/course/${courseId}`);
    return response.data;
  },

  async getStudentCourseEnrollment(studentId: number, courseId: number): Promise<Enrollment> {
    const response = await api.get<Enrollment>(`/enrollment/student/${studentId}/course/${courseId}`);
    return response.data;
  }
};
