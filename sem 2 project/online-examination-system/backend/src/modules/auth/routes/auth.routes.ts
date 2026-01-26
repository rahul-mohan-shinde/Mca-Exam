import { Router } from 'express';
import authController from '../controller/auth.controller';
import { validateLogin, validateRegister } from '../../../middlewares/validation.middleware';
import { rateLimiter } from '../../../middlewares/rate-limiter.middleware';

const router = Router();

// POST /api/auth/login
router.post(
  '/login',
  rateLimiter({ maxAttempts: 5, windowMs: 15 * 60 * 1000 }),
  validateLogin,
  authController.login.bind(authController)
);

// POST /api/auth/register
router.post(
  '/register',
  rateLimiter({ maxAttempts: 3, windowMs: 60 * 60 * 1000 }),
  validateRegister,
  authController.register.bind(authController)
);

// POST /api/auth/forgot-password
router.post(
  '/forgot-password',
  rateLimiter({ maxAttempts: 3, windowMs: 60 * 60 * 1000 }),
  authController.forgotPassword.bind(authController)
);

// POST /api/auth/reset-password
router.post(
  '/reset-password',
  authController.resetPassword.bind(authController)
);

// POST /api/auth/logout
router.post(
  '/logout',
  authController.logout.bind(authController)
);

export default router;

