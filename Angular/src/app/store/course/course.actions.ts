import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/course.model';

// Task 93: Course Actions
export const loadCourses = createAction('[Course] Load Courses');

export const loadCoursesSuccess = createAction(
  '[Course] Load Courses Success',
  props<{ courses: Course[] }>()
);

export const loadCoursesFailure = createAction(
  '[Course] Load Courses Failure',
  props<{ error: string }>()
);

// Task 99: Enrollment Actions
export const enrollInCourse = createAction(
  '[Enrollment] Enroll In Course',
  props<{ courseId: number }>()
);

export const unenrollFromCourse = createAction(
  '[Enrollment] Unenroll From Course',
  props<{ courseId: number }>()
);

export const setEnrolledCourses = createAction(
  '[Enrollment] Set Enrolled Courses',
  props<{ courseIds: number[] }>()
);
