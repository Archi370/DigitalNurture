import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  providers: [NotificationService], // Task: Hierarchical DI scoped to component
  template: `
    <div class="notification-toast-container">
      <div
        *ngFor="let notif of notificationService.notifications$ | async"
        class="toast"
        [ngClass]="'toast--' + notif.type"
      >
        <span>{{ notif.message }}</span>
        <button (click)="notificationService.removeNotification(notif.id)">✕</button>
      </div>
    </div>
  `,
  styles: [`
    .notification-toast-container {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      z-index: 9999;
    }
    .toast {
      padding: 0.8rem 1.2rem;
      border-radius: 8px;
      color: #fff;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideIn 0.3s ease;
    }
    .toast--success { background: #10b981; }
    .toast--error { background: #ef4444; }
    .toast--info { background: #3b82f6; }
    .toast button {
      background: none;
      border: none;
      color: #fff;
      cursor: pointer;
      font-weight: bold;
    }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class NotificationComponent {
  constructor(public notificationService: NotificationService) {}
}
