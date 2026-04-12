import { api } from "../lib/api";
import type { AuthResponse, LoginDto, CreateStudentDto } from "../types";

export const authService = {
  async login(credentials: LoginDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },

  async register(studentData: CreateStudentDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      "/auth/register",
      studentData,
    );
    return response.data;
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
