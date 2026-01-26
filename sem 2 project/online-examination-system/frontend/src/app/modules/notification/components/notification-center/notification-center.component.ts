import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-notification-center',
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.scss']
})
export class NotificationCenterComponent implements OnInit {
  notifications: any[] = [];
  unreadCount = 0;
  isLoading = false;
  showUnreadOnly = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
    this.loadUnreadCount();
  }

  // Step 1: Load notifications
  loadNotifications(): void {
    this.isLoading = true;
    this.notificationService.getUserNotifications(this.showUnreadOnly).subscribe({
      next: (response) => {
        if (response.success) {
          this.notifications = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading notifications:', error);
        this.isLoading = false;
      }
    });
  }

  // Step 2: Load unread count
  loadUnreadCount(): void {
    this.notificationService.getUnreadCount().subscribe({
      next: (response) => {
        if (response.success) {
          this.unreadCount = response.count;
        }
      }
    });
  }

  // Step 3: Mark as read
  markAsRead(notificationId: string): void {
    this.notificationService.markAsRead(notificationId).subscribe({
      next: () => {
        this.loadNotifications();
        this.loadUnreadCount();
      }
    });
  }

  // Step 4: Mark all as read
  markAllAsRead(): void {
    this.notificationService.markAllAsRead().subscribe({
      next: () => {
        this.loadNotifications();
        this.loadUnreadCount();
      }
    });
  }

  // Step 5: Toggle unread filter
  toggleUnreadFilter(): void {
    this.showUnreadOnly = !this.showUnreadOnly;
    this.loadNotifications();
  }
}

