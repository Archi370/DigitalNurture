import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../../models/course.model';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import * as CourseActions from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading, selectEnrolledIds } from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCardComponent],
  template: `
    <div class="course-list-page">
      <div class="page-header">
        <div>
          <h2>Available Academic Courses</h2>
          <p>Browse our catalog of high-impact computer science & engineering courses.</p>
        </div>

        <div class="filter-controls">
          <input
            type="text"
            [(ngModel)]="searchFilter"
            placeholder="Filter courses..."
            class="filter-input"
          />
          <button class="btn-refresh" (click)="refreshCourses()">🔄 Refresh</button>
        </div>
      </div>

      <!-- Task 3 Directive: isLoading spinner with delay -->
      <div class="loading-state" *ngIf="isLoading || (storeLoading$ | async)">
        <div class="spinner-sm"></div>
        <span>Loading catalog...</span>
      </div>

      <!-- Main Course Grid -->
      <ng-container *ngIf="!(isLoading || (storeLoading$ | async))">
        <div class="course-grid" *ngIf="(displayedCourses$ | async) as courses; else noCourses">
          <ng-container *ngIf="courses.length > 0; else noCourses">
            <!-- Task 3 Directive: trackBy function -->
            <app-course-card
              *ngFor="let course of courses; trackBy: trackByCourseId"
              [course]="course"
              (enrollRequested)="onEnroll($event)"
              (unenrollRequested)="onUnenroll($event)"
            ></app-course-card>
          </ng-container>
        </div>
      </ng-container>

      <!-- Task 3 Directive: *ngIf fallback template #noCourses -->
      <ng-template #noCourses>
        <div class="empty-state">
          <div class="empty-icon">📂</div>
          <h3>No Courses Found</h3>
          <p>Try adjusting your search filter or refreshing the catalog.</p>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .course-list-page {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .page-header h2 {
      margin: 0 0 0.25rem 0;
      color: #ffffff;
    }
    .page-header p {
      margin: 0;
      color: #94a3b8;
      font-size: 0.95rem;
    }
    .filter-controls {
      display: flex;
      gap: 0.5rem;
    }
    .filter-input {
      padding: 0.6rem 1rem;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      background: #1e293b;
      color: #fff;
    }
    .btn-refresh {
      padding: 0.6rem 1rem;
      border-radius: 8px;
      border: none;
      background: rgba(99, 102, 241, 0.2);
      color: #a5b4fc;
      font-weight: 600;
      cursor: pointer;
    }
    .loading-state {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      padding: 3rem;
      color: #94a3b8;
    }
    .spinner-sm {
      width: 24px;
      height: 24px;
      border: 3px solid rgba(99, 102, 241, 0.2);
      border-left-color: #6366f1;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    .course-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      background: #1e293b;
      border-radius: 12px;
      color: #cbd5e1;
    }
    .empty-icon { font-size: 3rem; margin-bottom: 0.5rem; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class CourseListComponent implements OnInit {
  searchFilter: string = '';
  isLoading: boolean = true;
  storeLoading$: Observable<boolean>;
  displayedCourses$: Observable<Course[]>;

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {
    this.storeLoading$ = this.store.select(selectCoursesLoading);

    const allCourses$ = this.store.select(selectAllCourses);
    const enrolledIds$ = this.store.select(selectEnrolledIds);

    this.displayedCourses$ = combineLatest([allCourses$, enrolledIds$]).pipe(
      map(([courses, enrolledIds]) =>
        courses.map(c => ({
          ...c,
          isEnrolled: enrolledIds.includes(c.id)
        })).filter(c =>
          !this.searchFilter.trim() ||
          c.title.toLowerCase().includes(this.searchFilter.toLowerCase()) ||
          c.code.toLowerCase().includes(this.searchFilter.toLowerCase())
        )
      )
    );
  }

  ngOnInit(): void {
    // Task 3: Simulate loading spinner with 2-second timeout delay
    setTimeout(() => {
      this.isLoading = false;
    }, 1200);

    // Task 96: Dispatch loadCourses action
    this.store.dispatch(CourseActions.loadCourses());

    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.searchFilter = params['q'];
      }
    });
  }

  // Task 3: trackBy function for *ngFor optimization
  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  refreshCourses(): void {
    this.store.dispatch(CourseActions.loadCourses());
  }

  onEnroll(course: Course): void {
    this.store.dispatch(CourseActions.enrollInCourse({ courseId: course.id }));
  }

  onUnenroll(course: Course): void {
    this.store.dispatch(CourseActions.unenrollFromCourse({ courseId: course.id }));
  }
}
