import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course.reducer';

// Task 95: Selectors
export const selectCourseFeature = createFeatureSelector<CourseState>('course');

export const selectAllCourses = createSelector(
  selectCourseFeature,
  (state: CourseState) => state ? state.courses : []
);

export const selectCoursesLoading = createSelector(
  selectCourseFeature,
  (state: CourseState) => state ? state.loading : false
);

export const selectCoursesError = createSelector(
  selectCourseFeature,
  (state: CourseState) => state ? state.error : null
);

// Task 99: Enrollment Selectors
export const selectEnrolledIds = createSelector(
  selectCourseFeature,
  (state: CourseState) => state ? state.enrolledCourseIds : []
);

// Task 99: Cross-slice selector combining courses and enrolled IDs
export const selectEnrolledCourses = createSelector(
  selectAllCourses,
  selectEnrolledIds,
  (courses, enrolledIds) => courses.filter(c => enrolledIds.includes(c.id))
);
