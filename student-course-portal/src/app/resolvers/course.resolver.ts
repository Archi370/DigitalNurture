import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course.model';

export const courseResolver: ResolveFn<Course> = (route) => {
  const courseService = inject(CourseService);
  const id = Number(route.paramMap.get('id'));
  return courseService.getCourseById(id);
};
