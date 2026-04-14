import { api } from "../lib/api";
import type {
  AuthResponse,
  LoginDto,
  CreateStudentDto,
  Student,
} from "../types";

export const authService = {
  async login(credentials: LoginDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },

  async register(studentData: CreateStudentDto): Promise<AuthResponse> {
    // Convert CreateStudentDto to RegisterDto format for backend
    const registerData = {
      first_name: studentData.firstName,
      last_name: studentData.lastName,
      email: studentData.email,
      phone: studentData.phone,
      password: studentData.password,
      role: "student" as const,
      current_level: studentData.current_level,
      instrument_id: studentData.instrument_id,
      admin_id: studentData.admin_id,
    };

    const response = await api.post<Student>("/auth/register", registerData);
    // Transform backend data to frontend format
    const backendStudent = response.data;
    const frontendStudent = {
      id: backendStudent.student_id,
      firstName: backendStudent.first_name,
      lastName: backendStudent.last_name,
      email: backendStudent.email,
      phone: backendStudent.phone,
      registrationDate: backendStudent.registration_date,
      currentLevel: backendStudent.current_level,
      instrument: backendStudent.instrument,
      admin: backendStudent.admin,
    };

    // Create a mock AuthResponse since the backend doesn't return tokens
    return {
      access_token: "mock_token_" + Date.now(),
      user: frontendStudent,
    };
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout");
    localStorage.removeItem("token");
  },

  async refreshToken(): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/refresh");
    return response.data;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },

  setToken(token: string): void {
    localStorage.setItem("token", token);
  },

  removeToken(): void {
    localStorage.removeItem("token");
  },
};
