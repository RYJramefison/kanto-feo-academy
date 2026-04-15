export interface Admin {
  admin_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  registration_date: string;
}

export interface Student {
  student_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  registration_date: string;
  current_level?: CourseLevel;
  instrument?: Instrument;
  admin?: Admin;
  enrollments?: Enrollment[];
  payments?: Payment[];
  schedules?: Schedule[];
  progress?: Progress[];
}

export interface CreateStudentDto {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  password: string;
  current_level?: CourseLevel;
  instrument_id: number;
  admin_id: number;
}

export interface UpdateStudentDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  age?: number;
  password?: string;
}

export interface Admin {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAdminDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UpdateAdminDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export interface Instrument {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  courses?: Course[];
}

export interface CreateInstrumentDto {
  name: string;
  description?: string;
}

export interface UpdateInstrumentDto {
  name?: string;
  description?: string;
}

export interface Course {
  id: number;
  title: string;
  description?: string;
  videoUrl?: string;
  duration?: number;
  level: CourseLevel;
  instrumentId: number;
  instrument?: Instrument;
  enrollments?: Enrollment[];
  progress?: Progress[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateCourseDto {
  title: string;
  description?: string;
  videoUrl?: string;
  duration?: number;
  level: CourseLevel;
  instrumentId: number;
}

export interface UpdateCourseDto {
  title?: string;
  description?: string;
  videoUrl?: string;
  duration?: number;
  level?: CourseLevel;
  instrumentId?: number;
}

export const CourseLevel = {
  BEGINNER: "BEGINNER",
  INTERMEDIATE: "INTERMEDIATE",
  ADVANCED: "ADVANCED",
} as const;

export type CourseLevel = (typeof CourseLevel)[keyof typeof CourseLevel];

export interface Payment {
  id: number;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  studentId: number;
  student?: Student;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentDto {
  amount: number;
  method: PaymentMethod;
  studentId: number;
  transactionId?: string;
}

export interface UpdatePaymentDto {
  amount?: number;
  method?: PaymentMethod;
  status?: PaymentStatus;
  transactionId?: string;
}

export const PaymentMethod = {
  ORANGE_MONEY: "ORANGE_MONEY",
  AIRTEL_MONEY: "AIRTEL_MONEY",
  MVOLA: "MVOLA",
} as const;

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export const PaymentStatus = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
} as const;

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export interface Enrollment {
  id: number;
  studentId: number;
  courseId: number;
  status: EnrollmentStatus;
  enrolledAt: string;
  student?: Student;
  course?: Course;
}

export interface CreateEnrollmentDto {
  studentId: number;
  courseId: number;
}

export interface UpdateEnrollmentDto {
  status?: EnrollmentStatus;
}

export const EnrollmentStatus = {
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
  SUSPENDED: "SUSPENDED",
} as const;

export type EnrollmentStatus =
  (typeof EnrollmentStatus)[keyof typeof EnrollmentStatus];

export interface Schedule {
  id: number;
  studentId: number;
  dayOfWeek: DayOfWeek;
  timeSlot: string;
  isActive: boolean;
  student?: Student;
  createdAt: string;
  updatedAt: string;
}

export interface CreateScheduleDto {
  studentId: number;
  dayOfWeek: DayOfWeek;
  timeSlot: string;
}

export interface UpdateScheduleDto {
  dayOfWeek?: DayOfWeek;
  timeSlot?: string;
  isActive?: boolean;
}

export const DayOfWeek = {
  MONDAY: "MONDAY",
  TUESDAY: "TUESDAY",
  WEDNESDAY: "WEDNESDAY",
  THURSDAY: "THURSDAY",
  FRIDAY: "FRIDAY",
  SATURDAY: "SATURDAY",
  SUNDAY: "SUNDAY",
} as const;

export type DayOfWeek = (typeof DayOfWeek)[keyof typeof DayOfWeek];

export interface Progress {
  id: number;
  studentId: number;
  courseId: number;
  completionPercentage: number;
  lastAccessedAt?: string;
  student?: Student;
  course?: Course;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProgressDto {
  studentId: number;
  courseId: number;
  completionPercentage: number;
}

export interface UpdateProgressDto {
  completionPercentage: number;
  lastAccessedAt?: string;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  studentId?: number;
  student?: Student;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNotificationDto {
  title: string;
  message: string;
  type: NotificationType;
  studentId?: number;
}

export interface UpdateNotificationDto {
  title?: string;
  message?: string;
  type?: NotificationType;
  isRead?: boolean;
}

export const NotificationType = {
  INFO: "INFO",
  SUCCESS: "SUCCESS",
  WARNING: "WARNING",
  ERROR: "ERROR",
} as const;

export type NotificationType =
  (typeof NotificationType)[keyof typeof NotificationType];

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  registrationDate?: string;
  currentLevel?: CourseLevel;
  instrument?: Instrument;
  admin?: Admin;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface LoginDto {
  email: string;
  password: string;
  role: "admin" | "student";
}
