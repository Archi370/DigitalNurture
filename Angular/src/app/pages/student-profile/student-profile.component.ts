import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { selectEnrolledCourses } from '../../store/course/course.selectors';
import { unenrollFromCourse } from '../../store/course/course.actions';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="profile-page">
      <div class="profile-card">
        <div class="avatar-section">
          <div class="avatar">👨‍🎓</div>
          <h2>Alex Johnson</h2>
          <p class="student-id">Student ID: #ST-2026-8849</p>
          <span class="status-badge">Active Student</span>
        </div>

        <div class="details-section">
          <h3>Academic Details</h3>
          <div class="details-grid">
            <div class="detail-item">
              <span class="label">Major</span>
              <span class="val">Computer Science & Engineering</span>
            </div>
            <div class="detail-item">
              <span class="label">Academic Year</span>
              <span class="val">Junior Year (3rd Year)</span>
            </div>
            <div class="detail-item">
              <span class="label">Email</span>
              <span class="val">alex.johnson&#64;university.edu</span>
            </div>
            <div class="detail-item">
              <span class="label">GPA</span>
              <span class="val">3.85 / 4.00</span>
            </div>
          </div>
        </div>
      </div>

      <div class="enrolled-section">
        <h3>My Enrolled Courses (NgRx Selectors Demo)</h3>

        <div class="enrolled-grid" *ngIf="(enrolledCourses$ | async) as courses; else emptyEnrolled">
          <ng-container *ngIf="courses.length > 0; else emptyEnrolled">
            <div class="enrolled-item-card" *ngFor="let course of courses">
              <div class="item-header">
                <span class="code">{{ course.code }}</span>
                <span class="credits">{{ course.credits }} Credits</span>
              </div>
              <h4>{{ course.title }}</h4>
              <p>Instructor: {{ course.instructor }}</p>
              <div class="item-actions">
                <a [routerLink]="['/courses', course.id]" class="btn-link">View Course</a>
                <button class="btn-drop" (click)="dropCourse(course.id)">Drop Course</button>
              </div>
            </div>
          </ng-container>
        </div>

        <ng-template #emptyEnrolled>
          <div class="empty-enrolled">
            <p>You have not enrolled in any courses yet.</p>
            <a routerLink="/courses" class="btn-catalog">Browse Catalog</a>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .profile-page {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .profile-card {
      background: #1e293b;
      border-radius: 16px;
      padding: 2rem;
      display: flex;
      gap: 2.5rem;
      align-items: center;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    }
    @media (max-width: 768px) {
      .profile-card { flex-direction: column; text-align: center; }
    }
    .avatar-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }
    .avatar {
      font-size: 4rem;
      background: rgba(99, 102, 241, 0.15);
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: 2px solid #6366f1;
    }
    .avatar-section h2 { margin: 0; color: #fff; }
    .student-id { margin: 0; color: #94a3b8; font-size: 0.85rem; }
    .status-badge {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      padding: 0.3rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }
    .details-section { flex: 1; color: #fff; }
    .details-section h3 { margin-top: 0; color: #818cf8; }
    .details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }
    .detail-item {
      background: rgba(15, 23, 42, 0.6);
      padding: 0.8rem;
      border-radius: 8px;
    }
    .detail-item .label { display: block; font-size: 0.75rem; color: #94a3b8; }
    .detail-item .val { font-size: 0.95rem; font-weight: 600; color: #fff; }
    .enrolled-section {
      background: #1e293b;
      padding: 2rem;
      border-radius: 16px;
      color: #fff;
    }
    .enrolled-section h3 { margin-top: 0; color: #a855f7; }
    .enrolled-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1rem;
    }
    .enrolled-item-card {
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 1rem;
      border-radius: 10px;
    }
    .item-header { display: flex; justify-content: space-between; font-size: 0.85rem; }
    .item-header .code { color: #818cf8; font-weight: bold; }
    .item-header .credits { color: #a5b4fc; }
    .enrolled-item-card h4 { margin: 0.5rem 0; color: #fff; }
    .enrolled-item-card p { margin: 0 0 1rem 0; font-size: 0.85rem; color: #94a3b8; }
    .item-actions { display: flex; justify-content: space-between; align-items: center; }
    .btn-link { color: #818cf8; text-decoration: none; font-size: 0.85rem; font-weight: 600; }
    .btn-drop { background: #ef4444; color: #fff; border: none; padding: 0.4rem 0.75rem; border-radius: 6px; cursor: pointer; }
    .empty-enrolled { text-align: center; padding: 2rem; color: #94a3b8; }
    .btn-catalog { display: inline-block; margin-top: 0.5rem; background: #6366f1; color: #fff; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; }
  `]
})
export class StudentProfileComponent {
  enrolledCourses$: Observable<Course[]>;

  constructor(private store: Store) {
    this.enrolledCourses$ = this.store.select(selectEnrolledCourses);
  }

  dropCourse(courseId: number): void {
    this.store.dispatch(unenrollFromCourse({ courseId }));
  }
}
