import { Router } from 'express';
import adminController from '../controller/admin.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { requireRole } from '../../../middlewares/role.middleware';

const router = Router();

// All admin routes require authentication and admin role
router.use(authMiddleware);
router.use(requireRole(['admin', 'super_admin']));

// GET /api/admin/dashboard
router.get('/dashboard', adminController.getDashboard.bind(adminController));

export default router;

