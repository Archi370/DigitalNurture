import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="summary-card">
      <h3>📊 Quick Course Overview</h3>
      <div class="stats-grid">
        <div class="stat-box">
          <span class="stat-value">{{ totalCourses }}</span>
          <span class="stat-label">Total Courses</span>
        </div>
        <div class="stat-box">
          <span class="stat-value">{{ totalCredits }}</span>
          <span class="stat-label">Total Credits</span>
        </div>
        <div class="stat-box">
          <span class="stat-value">{{ passedCount }}</span>
          <span class="stat-label">Passed Courses</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .summary-card {
      background: linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9));
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 1.25rem;
      margin-bottom: 1.5rem;
      color: #fff;
    }
    .summary-card h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      font-size: 1.1rem;
      color: #cbd5e1;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 1rem;
    }
    .stat-box {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      padding: 0.8rem;
      text-align: center;
    }
    .stat-value {
      display: block;
      font-size: 1.5rem;
      font-weight: 700;
      color: #818cf8;
    }
    .stat-label {
      font-size: 0.8rem;
      color: #94a3b8;
    }
  `]
})
export class CourseSummaryWidgetComponent implements OnInit {
  totalCourses: number = 0;
  totalCredits: number = 0;
  passedCount: number = 0;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.totalCourses = courses.length;
      this.totalCredits = courses.reduce((acc, c) => acc + c.credits, 0);
      this.passedCount = courses.filter(c => c.gradeStatus === 'passed').length;
    });
  }
}
