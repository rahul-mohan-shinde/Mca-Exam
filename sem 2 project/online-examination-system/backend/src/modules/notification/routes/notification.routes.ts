import { Router } from 'express';
import notificationController from '../controller/notification.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/notifications', notificationController.createNotification.bind(notificationController));
router.get('/notifications', notificationController.getUserNotifications.bind(notificationController));
router.get('/notifications/unread-count', notificationController.getUnreadCount.bind(notificationController));
router.put('/notifications/:id/read', notificationController.markAsRead.bind(notificationController));
router.put('/notifications/read-all', notificationController.markAllAsRead.bind(notificationController));

export default router;

