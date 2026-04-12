// Types pour les données brutes de l'API backend (snake_case)
export interface RawInstrumentData {
  instrument_id: number;
  name: string;
  description: string | null;
  students?: RawStudentData[] | null;
  courses?: RawCourseData[] | null;
}

export interface RawCourseData {
  course_id: number;
  title: string;
  description: string;
  level: string;
  video_url: string | null;
  publication_date: string;
  instrument_id: number;
  admin_id: number;
  instrument?: RawInstrumentData;
  admin?: RawAdminData;
  enrollments?: RawEnrollmentData[];
  progresses?: RawProgressData[];
}

export interface RawStudentData {
  student_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  registration_date: string;
  current_level: string;
  admin?: RawAdminData;
}

export interface RawAdminData {
  admin_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  registration_date: string;
}

export interface RawEnrollmentData {
  enrollment_id: number;
  enrollment_date: string;
  student_id: number;
  course_id: number;
  student?: RawStudentData;
  course?: RawCourseData;
}

export interface RawProgressData {
  progress_id: number;
  lesson_completed: boolean;
  validation_date: string;
  achieved_level: string;
  student_id: number;
  course_id: number;
  student?: RawStudentData;
  course?: RawCourseData;
}
