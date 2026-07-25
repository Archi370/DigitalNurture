import { createReducer, on } from '@ngrx/store';
import { Course } from '../../models/course.model';
import * as CourseActions from './course.actions';

export interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
  enrolledCourseIds: number[];
}

export const initialCourseState: CourseState = {
  courses: [],
  loading: false,
  error: null,
  enrolledCourseIds: [1] // default enrolled in course 1
};

export const courseReducer = createReducer(
  initialCourseState,
  on(CourseActions.loadCourses, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CourseActions.loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
    loading: false,
    error: null
  })),
  on(CourseActions.loadCoursesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(CourseActions.enrollInCourse, (state, { courseId }) => ({
    ...state,
    enrolledCourseIds: state.enrolledCourseIds.includes(courseId)
      ? state.enrolledCourseIds
      : [...state.enrolledCourseIds, courseId]
  })),
  on(CourseActions.unenrollFromCourse, (state, { courseId }) => ({
    ...state,
    enrolledCourseIds: state.enrolledCourseIds.filter(id => id !== courseId)
  })),
  on(CourseActions.setEnrolledCourses, (state, { courseIds }) => ({
    ...state,
    enrolledCourseIds: courseIds
  }))
);
