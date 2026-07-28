import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CourseSummaryWidgetComponent],
  template: `
    <div class="home-page">
      <section class="hero-section">
        <div class="hero-content">
          <span class="badge" *ngIf="isPortalActive">● Portal Status: Active</span>
          <h1 class="hero-title">Welcome to <span class="highlight">{{ portalName }}</span></h1>
          <p class="hero-subtitle">
            Explore world-class academic courses, register for upcoming semesters, and manage your student profile seamlessly.
          </p>

          <div class="search-box">
            <input
              type="text"
              [(ngModel)]="searchTerm"
              placeholder="Search for courses (e.g. Data Structures, Web, AI)..."
              class="search-input"
            />
            <button class="btn-search" (click)="onSearch()">Search Courses</button>
          </div>

          <div class="cta-buttons">
            <button class="btn-primary" (click)="onEnrollClick()">🚀 Quick Enroll</button>
            <a routerLink="/courses" class="btn-secondary">Browse All Courses</a>
          </div>
        </div>
      </section>

      <app-course-summary-widget></app-course-summary-widget>

      <section class="stats-banner">
        <div class="stat-card">
          <div class="stat-icon">📚</div>
          <div class="stat-number">12</div>
          <div class="stat-desc">Available Courses</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🎓</div>
          <div class="stat-number">150</div>
          <div class="stat-desc">Enrolled Students</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">👨‍🏫</div>
          <div class="stat-number">8</div>
          <div class="stat-desc">Active Instructors</div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-page {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }
    .hero-section {
      background: linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95));
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 3rem 2rem;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
    .badge {
      display: inline-block;
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
      padding: 0.35rem 0.8rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    .hero-title {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 1rem;
      color: #ffffff;
    }
    .highlight {
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero-subtitle {
      font-size: 1.1rem;
      color: #94a3b8;
      max-width: 650px;
      margin: 0 auto 2rem auto;
    }
    .search-box {
      display: flex;
      max-width: 550px;
      margin: 0 auto 2rem auto;
      gap: 0.5rem;
    }
    .search-input {
      flex: 1;
      padding: 0.8rem 1.2rem;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      background: rgba(15, 23, 42, 0.8);
      color: #ffffff;
      font-size: 0.95rem;
    }
    .btn-search {
      padding: 0.8rem 1.5rem;
      border-radius: 8px;
      border: none;
      background: #6366f1;
      color: #fff;
      font-weight: 600;
      cursor: pointer;
    }
    .cta-buttons {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }
    .btn-primary {
      padding: 0.8rem 1.8rem;
      border-radius: 8px;
      border: none;
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
      color: #fff;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
    }
    .btn-secondary {
      padding: 0.8rem 1.8rem;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: transparent;
      color: #fff;
      font-weight: 600;
      text-decoration: none;
    }
    .stats-banner {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem;
    }
    .stat-card {
      background: #1e293b;
      border-radius: 12px;
      padding: 1.5rem;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .stat-icon { font-size: 2.2rem; margin-bottom: 0.5rem; }
    .stat-number { font-size: 2rem; font-weight: 800; color: #818cf8; }
    .stat-desc { color: #94a3b8; font-size: 0.9rem; }
  `]
})
export class HomeComponent implements OnInit, OnDestroy {
  portalName: string = 'Student Course Portal';
  isPortalActive: boolean = true;
  searchTerm: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('HomeComponent initialized');
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  onEnrollClick(): void {
    this.router.navigate(['/enroll']);
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/courses'], { queryParams: { q: this.searchTerm } });
    }
  }
}
