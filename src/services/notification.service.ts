import { API_CONFIG } from '@/constants';
import type { Notification } from '@/types';
import { api } from './api';

export class NotificationService {
  // Get notifications
  async getNotifications(
    unreadOnly: boolean = false,
    skip: number = 0,
    limit: number = 50
  ): Promise<Notification[]> {
    const params = new URLSearchParams({
      unread_only: unreadOnly.toString(),
      skip: skip.toString(),
      limit: limit.toString(),
    });

    return api.get<Notification[]>(`${API_CONFIG.ENDPOINTS.NOTIFICATIONS.BASE}?${params.toString()}`);
  }

  // Get unread count
  async getUnreadCount(): Promise<{ count: number }> {
    return api.get<{ count: number }>(API_CONFIG.ENDPOINTS.NOTIFICATIONS.UNREAD_COUNT);
  }

  // Mark notification as read
  async markNotificationRead(notificationId: string): Promise<Notification> {
    return api.put<Notification>(
      API_CONFIG.ENDPOINTS.NOTIFICATIONS.MARK_READ.replace('{notification_id}', notificationId)
    );
  }

  // Mark all notifications as read
  async markAllNotificationsRead(): Promise<void> {
    return api.put<void>(API_CONFIG.ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ);
  }

  // Get single notification
  async getNotification(notificationId: string): Promise<Notification> {
    return api.get<Notification>(API_CONFIG.ENDPOINTS.NOTIFICATIONS.BY_ID.replace('{notification_id}', notificationId));
  }

  // Delete notification
  async deleteNotification(notificationId: string): Promise<void> {
    return api.delete<void>(API_CONFIG.ENDPOINTS.NOTIFICATIONS.BY_ID.replace('{notification_id}', notificationId));
  }

  // Get unread notifications only
  async getUnreadNotifications(skip: number = 0, limit: number = 50): Promise<Notification[]> {
    return this.getNotifications(true, skip, limit);
  }

  // Get read notifications only
  async getReadNotifications(skip: number = 0, limit: number = 50): Promise<Notification[]> {
    return this.getNotifications(false, skip, limit);
  }
}
