import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface NotificationMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable()
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<NotificationMessage[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  showNotification(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    const newNotif: NotificationMessage = {
      id: Date.now(),
      message,
      type
    };
    const current = this.notificationsSubject.value;
    this.notificationsSubject.next([...current, newNotif]);

    setTimeout(() => {
      this.removeNotification(newNotif.id);
    }, 4000);
  }

  removeNotification(id: number): void {
    const current = this.notificationsSubject.value;
    this.notificationsSubject.next(current.filter(n => n.id !== id));
  }
}
