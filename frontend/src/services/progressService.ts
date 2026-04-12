import { api } from '../lib/api';
import type { 
  Progress, 
  CreateProgressDto, 
  UpdateProgressDto
} from '../types';

export const progressService = {
  async getAll(): Promise<Progress[]> {
    const response = await api.get<Progress[]>('/progress');
    return response.data;
  },

  async getById(id: number): Promise<Progress> {
    const response = await api.get<Progress>(`/progress/${id}`);
    return response.data;
  },

  async create(progressData: CreateProgressDto): Promise<Progress> {
    const response = await api.post<Progress>('/progress', progressData);
    return response.data;
  },

  async update(id: number, progressData: UpdateProgressDto): Promise<Progress> {
    const response = await api.patch<Progress>(`/progress/${id}`, progressData);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/progress/${id}`);
  },

  async getStudentProgress(studentId: number): Promise<Progress[]> {
    const response = await api.get<Progress[]>(`/progress/student/${studentId}`);
    return response.data;
  },

  async getCourseProgress(courseId: number): Promise<Progress[]> {
    const response = await api.get<Progress[]>(`/progress/course/${courseId}`);
    return response.data;
  },

  async getStudentCourseProgress(studentId: number, courseId: number): Promise<Progress[]> {
    const response = await api.get<Progress[]>(`/progress/student/${studentId}/course/${courseId}`);
    return response.data;
  }
};
