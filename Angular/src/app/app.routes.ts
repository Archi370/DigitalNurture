import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';
import { courseResolver } from './resolvers/course.resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'courses',
    loadComponent: () => import('./pages/course-list/course-list.component').then(m => m.CourseListComponent)
  },
  {
    path: 'courses/:id',
    loadComponent: () => import('./pages/course-detail/course-detail.component').then(m => m.CourseDetailComponent),
    resolve: {
      course: courseResolver
    }
  },
  {
    path: 'enroll',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/enrollment-form/enrollment-form.component').then(m => m.EnrollmentFormComponent)
  },
  {
    path: 'reactive-enroll',
    canDeactivate: [unsavedChangesGuard],
    loadComponent: () => import('./pages/reactive-enrollment-form/reactive-enrollment-form.component').then(m => m.ReactiveEnrollmentFormComponent)
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/student-profile/student-profile.component').then(m => m.StudentProfileComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
