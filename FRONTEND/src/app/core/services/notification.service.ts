import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSource = new BehaviorSubject<string>('');
  currentNotification = this.notificationSource.asObservable();

  constructor() {}

  sendNotification(message: string): void {
    this.notificationSource.next(message);
    setTimeout(() => this.notificationSource.next(''), 3000);
  }
  sendLongNotification(message: string): void {
    this.notificationSource.next(message);
    setTimeout(() => this.notificationSource.next(''), 15000);
  }
}
