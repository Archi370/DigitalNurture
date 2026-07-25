import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="spinner-overlay" *ngIf="loadingService.isLoading$ | async">
      <div class="spinner-container">
        <div class="spinner"></div>
        <p>Loading API Data...</p>
      </div>
    </div>
  `,
  styles: [`
    .spinner-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(15, 23, 42, 0.7);
      backdrop-filter: blur(4px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    .spinner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      color: #ffffff;
      font-weight: 600;
    }
    .spinner {
      width: 48px;
      height: 48px;
      border: 4px solid rgba(99, 102, 241, 0.2);
      border-left-color: #6366f1;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class LoadingSpinnerComponent {
  constructor(public loadingService: LoadingService) {}
}
