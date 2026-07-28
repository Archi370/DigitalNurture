export interface Course {
  id: number;
  code: string;
  title: string;
  description?: string;
  instructor: string;
  credits: number;
  gradeStatus: 'passed' | 'failed' | 'pending';
  department?: string;
  isEnrolled?: boolean;
}

export interface Student {
  id: number;
  name: string;
  email: string;
  enrolledCourseId: number;
}

export interface Enrollment {
  id?: number;
  studentName: string;
  studentEmail: string;
  courseId: number | string;
  preferredSemester: string;
  agreeToTerms: boolean;
  submissionDate?: string;
  additionalCourses?: string[];
}
