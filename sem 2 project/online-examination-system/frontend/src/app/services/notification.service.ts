import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  // Step 1: Get user notifications
  getUserNotifications(unreadOnly: boolean = false): Observable<any> {
    return this.http.get(`${API_URL}/notifications`, {
      params: { unreadOnly: unreadOnly.toString() }
    });
  }

  // Step 2: Get unread count
  getUnreadCount(): Observable<any> {
    return this.http.get(`${API_URL}/notifications/unread-count`);
  }

  // Step 3: Mark as read
  markAsRead(notificationId: string): Observable<any> {
    return this.http.put(`${API_URL}/notifications/${notificationId}/read`, {});
  }

  // Step 4: Mark all as read
  markAllAsRead(): Observable<any> {
    return this.http.put(`${API_URL}/notifications/read-all`, {});
  }
}

