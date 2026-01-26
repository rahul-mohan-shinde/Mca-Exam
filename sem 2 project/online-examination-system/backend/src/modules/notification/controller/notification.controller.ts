import { Request, Response, NextFunction } from 'express';
import notificationService from '../service/notification.service';

export class NotificationController {
  // Step 1: Create notification
  async createNotification(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const notification = await notificationService.createNotification(req.body);
      res.status(201).json({ success: true, data: notification });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Step 2: Get user notifications
  async getUserNotifications(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = (req as any).user?.userId;
      const unreadOnly = req.query.unreadOnly === 'true';
      const notifications = await notificationService.getUserNotifications(userId, unreadOnly);
      res.status(200).json({ success: true, data: notifications });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Step 3: Mark as read
  async markAsRead(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = (req as any).user?.userId;
      const notification = await notificationService.markAsRead(req.params.id, userId);
      res.status(200).json({ success: true, data: notification });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Step 4: Mark all as read
  async markAllAsRead(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = (req as any).user?.userId;
      await notificationService.markAllAsRead(userId);
      res.status(200).json({ success: true, message: 'All notifications marked as read' });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Step 5: Get unread count
  async getUnreadCount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = (req as any).user?.userId;
      const count = await notificationService.getUnreadCount(userId);
      res.status(200).json({ success: true, count });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new NotificationController();

