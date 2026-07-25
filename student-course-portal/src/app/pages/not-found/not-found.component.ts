import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="not-found-page">
      <div class="error-code">404</div>
      <h2>Page Not Found</h2>
      <p>The page or route you requested does not exist or has been moved.</p>
      <a routerLink="/" class="btn-home">Return to Home</a>
    </div>
  `,
  styles: [`
    .not-found-page {
      text-align: center;
      padding: 5rem 2rem;
      color: #fff;
    }
    .error-code {
      font-size: 6rem;
      font-weight: 900;
      background: linear-gradient(135deg, #ef4444, #f59e0b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .btn-home {
      display: inline-block;
      margin-top: 1.5rem;
      padding: 0.8rem 1.5rem;
      border-radius: 8px;
      background: #6366f1;
      color: #fff;
      text-decoration: none;
      font-weight: 600;
    }
  `]
})
export class NotFoundComponent {}
