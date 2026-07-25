import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, RouterLink, CreditLabelPipe, HighlightDirective],
  template: `
    <div
      class="course-card"
      [appHighlight]="'rgba(99, 102, 241, 0.08)'"
      [ngClass]="{
        'card--enrolled': course?.isEnrolled,
        'card--full': (course?.credits || 0) >= 4
      }"
      [ngStyle]="{
        'border-left': '5px solid ' + getStatusBorderColor(course?.gradeStatus)
      }"
    >
      <div class="card-header">
        <div class="code-tag">{{ course?.code }}</div>
        <div class="status-badge" [ngClass]="'status--' + course?.gradeStatus">
          <ng-container [ngSwitch]="course?.gradeStatus">
            <span *ngSwitchCase="'passed'">✓ Passed</span>
            <span *ngSwitchCase="'failed'">✕ Failed</span>
            <span *ngSwitchCase="'pending'">⏳ Pending</span>
            <span *ngSwitchDefault>Unknown</span>
          </ng-container>
        </div>
      </div>

      <h3 class="card-title">{{ course?.title }}</h3>
      <p class="instructor">Instructor: <strong>{{ course?.instructor }}</strong></p>

      <div class="card-meta">
        <span class="credits">{{ course?.credits | creditLabel }}</span>
        <span class="dept" *ngIf="course?.department">{{ course?.department }}</span>
      </div>

      <div class="card-details" *ngIf="isExpanded">
        <p class="description">{{ course?.description || 'No description provided.' }}</p>
      </div>

      <div class="card-actions">
        <button class="btn-toggle" (click)="toggleDetails()">
          {{ isExpanded ? 'Hide Details ▲' : 'Show Details ▼' }}
        </button>

        <a [routerLink]="['/courses', course?.id]" class="btn-view">
          View Details
        </a>

        <button
          *ngIf="!course?.isEnrolled"
          class="btn-enroll"
          (click)="onEnroll()"
        >
          Enroll Now
        </button>

        <button
          *ngIf="course?.isEnrolled"
          class="btn-unenroll"
          (click)="onUnenroll()"
        >
          Unenroll
        </button>
      </div>
    </div>
  `,
  styles: [`
    .course-card {
      background: #1e293b;
      border-radius: 12px;
      padding: 1.25rem;
      color: #f8fafc;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .course-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
    }
    .card--enrolled {
      background: #1e293b;
      box-shadow: 0 0 0 2px #6366f1;
    }
    .card--full {
      position: relative;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .code-tag {
      background: rgba(99, 102, 241, 0.2);
      color: #818cf8;
      padding: 0.25rem 0.6rem;
      border-radius: 6px;
      font-weight: 700;
      font-size: 0.85rem;
    }
    .status-badge {
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0.25rem 0.6rem;
      border-radius: 20px;
    }
    .status--passed { background: rgba(16, 185, 129, 0.2); color: #34d399; }
    .status--failed { background: rgba(239, 68, 68, 0.2); color: #f87171; }
    .status--pending { background: rgba(245, 158, 11, 0.2); color: #fbbf24; }
    .card-title {
      font-size: 1.15rem;
      margin: 0;
      color: #ffffff;
      font-weight: 600;
    }
    .instructor {
      margin: 0;
      font-size: 0.9rem;
      color: #94a3b8;
    }
    .instructor strong { color: #cbd5e1; }
    .card-meta {
      display: flex;
      gap: 1rem;
      font-size: 0.85rem;
      color: #a5b4fc;
    }
    .card-details {
      background: rgba(15, 23, 42, 0.6);
      padding: 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
      color: #94a3b8;
    }
    .card-actions {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      margin-top: auto;
    }
    .btn-toggle, .btn-view, .btn-enroll, .btn-unenroll {
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      border: none;
      font-weight: 600;
      font-size: 0.85rem;
      cursor: pointer;
      text-decoration: none;
      text-align: center;
      transition: background 0.2s ease;
    }
    .btn-toggle {
      background: rgba(255, 255, 255, 0.1);
      color: #cbd5e1;
    }
    .btn-view {
      background: rgba(99, 102, 241, 0.2);
      color: #a5b4fc;
    }
    .btn-enroll {
      background: #6366f1;
      color: #ffffff;
      margin-left: auto;
    }
    .btn-unenroll {
      background: #ef4444;
      color: #ffffff;
      margin-left: auto;
    }
  `]
})
export class CourseCardComponent implements OnChanges {
  @Input() course!: Course;
  @Output() enrollRequested = new EventEmitter<Course>();
  @Output() unenrollRequested = new EventEmitter<Course>();

  isExpanded: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CourseCardComponent ngOnChanges:', changes);
  }

  toggleDetails(): void {
    this.isExpanded = !this.isExpanded;
  }

  onEnroll(): void {
    if (this.course) {
      this.enrollRequested.emit(this.course);
    }
  }

  onUnenroll(): void {
    if (this.course) {
      this.unenrollRequested.emit(this.course);
    }
  }

  getStatusBorderColor(status?: string): string {
    switch (status) {
      case 'passed': return '#10b981';
      case 'failed': return '#ef4444';
      case 'pending': return '#f59e0b';
      default: return '#64748b';
    }
  }
}
