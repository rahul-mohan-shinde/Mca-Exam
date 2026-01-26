import Notification from '../model/notification.model';

export class NotificationService {
  // Step 1: Create notification
  async createNotification(notificationData: {
    user_id: string;
    title: string;
    message: string;
    type?: 'EMAIL' | 'IN_APP' | 'BOTH';
  }): Promise<any> {
    const notification = await Notification.create({
      ...notificationData,
      type: notificationData.type || 'IN_APP',
      sent_at: new Date()
    });

    // TODO: Send email if type is EMAIL or BOTH
    // await emailService.sendEmail(...);

    return notification;
  }

  // Step 2: Get user notifications
  async getUserNotifications(userId: string, unreadOnly: boolean = false): Promise<any[]> {
    const query: any = { user_id: userId };
    if (unreadOnly) {
      query.is_read = false;
    }

    return await Notification.find(query)
      .sort({ created_at: -1 })
      .limit(50);
  }

  // Step 3: Mark as read
  async markAsRead(notificationId: string, userId: string): Promise<any> {
    return await Notification.findOneAndUpdate(
      { _id: notificationId, user_id: userId },
      { is_read: true, read_at: new Date() },
      { new: true }
    );
  }

  // Step 4: Mark all as read
  async markAllAsRead(userId: string): Promise<void> {
    await Notification.updateMany(
      { user_id: userId, is_read: false },
      { is_read: true, read_at: new Date() }
    );
  }

  // Step 5: Get unread count
  async getUnreadCount(userId: string): Promise<number> {
    return await Notification.countDocuments({ user_id: userId, is_read: false });
  }
}

export default new NotificationService();

