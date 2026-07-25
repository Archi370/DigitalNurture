import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Course, Student } from '../../models/course.model';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="course-detail-page" *ngIf="course">
      <div class="navigation-bar">
        <a routerLink="/courses" class="back-link">← Back to Course Catalog</a>
      </div>

      <div class="detail-header">
        <div class="header-badges">
          <span class="code-badge">{{ course.code }}</span>
          <span class="dept-badge" *ngIf="course.department">{{ course.department }}</span>
        </div>
        <h1>{{ course.title }}</h1>
        <p class="instructor">Instructor: <strong>{{ course.instructor }}</strong></p>
      </div>

      <div class="detail-content">
        <div class="main-info">
          <h3>Course Description</h3>
          <p>{{ course.description || 'Detailed course overview and curriculum topics.' }}</p>

          <div class="info-grid">
            <div class="info-item">
              <span class="label">Credits</span>
              <span class="value">{{ course.credits }} Academic Credits</span>
            </div>
            <div class="info-item">
              <span class="label">Status</span>
              <span class="value capitalize">{{ course.gradeStatus }}</span>
            </div>
          </div>
        </div>

        <div class="enrolled-students-section">
          <h3>Enrolled Students (switchMap Demo)</h3>
          <ul class="student-list" *ngIf="(students$ | async) as students">
            <li *ngFor="let student of students">
              <span class="student-avatar">👤</span>
              <div>
                <strong>{{ student.name }}</strong>
                <div class="student-email">{{ student.email }}</div>
              </div>
            </li>
            <li *ngIf="students.length === 0" class="no-students">
              No students enrolled in this course yet.
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .course-detail-page {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .back-link {
      color: #818cf8;
      text-decoration: none;
      font-weight: 600;
    }
    .detail-header {
      background: #1e293b;
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .header-badges {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }
    .code-badge {
      background: rgba(99, 102, 241, 0.2);
      color: #818cf8;
      padding: 0.3rem 0.6rem;
      border-radius: 6px;
      font-weight: 700;
    }
    .dept-badge {
      background: rgba(148, 163, 184, 0.15);
      color: #cbd5e1;
      padding: 0.3rem 0.6rem;
      border-radius: 6px;
    }
    .detail-header h1 {
      margin: 0 0 0.5rem 0;
      color: #ffffff;
    }
    .instructor { color: #94a3b8; margin: 0; }
    .detail-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1.5rem;
    }
    @media (max-width: 768px) {
      .detail-content { grid-template-columns: 1fr; }
    }
    .main-info, .enrolled-students-section {
      background: #1e293b;
      padding: 1.5rem;
      border-radius: 12px;
      color: #cbd5e1;
    }
    .main-info h3, .enrolled-students-section h3 {
      color: #fff;
      margin-top: 0;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    .info-item {
      background: rgba(15, 23, 42, 0.5);
      padding: 1rem;
      border-radius: 8px;
    }
    .info-item .label {
      display: block;
      font-size: 0.8rem;
      color: #94a3b8;
    }
    .info-item .value {
      font-size: 1.1rem;
      font-weight: 700;
      color: #fff;
    }
    .student-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .student-list li {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: rgba(15, 23, 42, 0.5);
      padding: 0.75rem;
      border-radius: 8px;
    }
    .student-avatar { font-size: 1.2rem; }
    .student-email { font-size: 0.8rem; color: #94a3b8; }
    .no-students { color: #94a3b8; font-style: italic; }
  `]
})
export class CourseDetailComponent implements OnInit {
  course!: Course;
  students$: Observable<Student[]> = of([]);

  constructor(
    private route: ActivatedRoute,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      if (data['course']) {
        this.course = data['course'];
        this.students$ = this.enrollmentService.getStudentsByCourse(of(this.course.id));
      }
    });
  }
}
