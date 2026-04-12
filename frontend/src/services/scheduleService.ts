import { api } from '../lib/api';
import type { 
  Schedule, 
  CreateScheduleDto, 
  UpdateScheduleDto,
  DayOfWeek
} from '../types';

export const scheduleService = {
  async getAll(): Promise<Schedule[]> {
    const response = await api.get<Schedule[]>('/schedule');
    return response.data;
  },

  async getById(id: number): Promise<Schedule> {
    const response = await api.get<Schedule>(`/schedule/${id}`);
    return response.data;
  },

  async create(scheduleData: CreateScheduleDto): Promise<Schedule> {
    const response = await api.post<Schedule>('/schedule', scheduleData);
    return response.data;
  },

  async update(id: number, scheduleData: UpdateScheduleDto): Promise<Schedule> {
    const response = await api.patch<Schedule>(`/schedule/${id}`, scheduleData);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/schedule/${id}`);
  },

  async getStudentSchedules(studentId: number): Promise<Schedule[]> {
    const response = await api.get<Schedule[]>(`/schedule/student/${studentId}`);
    return response.data;
  },

  async getSchedulesByDay(day: DayOfWeek): Promise<Schedule[]> {
    const response = await api.get<Schedule[]>(`/schedule/day/${day}`);
    return response.data;
  }
};
