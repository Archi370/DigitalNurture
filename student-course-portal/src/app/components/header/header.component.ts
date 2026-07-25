import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { selectEnrolledIds } from '../../store/course/course.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="app-header">
      <div class="header-container">
        <a routerLink="/" class="logo">
          <span class="logo-icon">🎓</span>
          <span class="logo-text">Student Course Portal</span>
        </a>

        <nav class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
          <a routerLink="/courses" routerLinkActive="active">Courses</a>
          <a routerLink="/enroll" routerLinkActive="active">Template Form</a>
          <a routerLink="/reactive-enroll" routerLinkActive="active">Reactive Form</a>
          <a routerLink="/profile" routerLinkActive="active">Profile</a>
        </nav>

        <div class="header-actions">
          <div class="enrolled-badge" title="Enrolled Courses">
            <span class="badge-icon">📚</span>
            <span class="badge-count">{{ (enrolledIds$ | async)?.length || 0 }}</span>
          </div>

          <button class="auth-btn" (click)="toggleAuth()" [class.logged-in]="authService.isLoggedIn">
            {{ authService.isLoggedIn ? '🔓 Logout' : '🔒 Login' }}
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .app-header {
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }
    .header-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      font-weight: 700;
      font-size: 1.25rem;
      color: #ffffff;
    }
    .logo-text {
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .nav-links {
      display: flex;
      gap: 1.5rem;
    }
    .nav-links a {
      color: #94a3b8;
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      transition: all 0.2s ease;
    }
    .nav-links a:hover, .nav-links a.active {
      color: #ffffff;
      background: rgba(99, 102, 241, 0.15);
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .enrolled-badge {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      background: rgba(99, 102, 241, 0.2);
      border: 1px solid rgba(99, 102, 241, 0.4);
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      color: #a5b4fc;
      font-weight: 600;
      font-size: 0.9rem;
    }
    .auth-btn {
      padding: 0.5rem 1rem;
      border-radius: 8px;
      border: none;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      background: #ef4444;
      color: #ffffff;
    }
    .auth-btn.logged-in {
      background: #10b981;
    }
  `]
})
export class HeaderComponent {
  enrolledIds$: Observable<number[]>;

  constructor(
    public authService: AuthService,
    private store: Store
  ) {
    this.enrolledIds$ = this.store.select(selectEnrolledIds);
  }

  toggleAuth(): void {
    if (this.authService.isLoggedIn) {
      this.authService.logout();
    } else {
      this.authService.login();
    }
  }
}
