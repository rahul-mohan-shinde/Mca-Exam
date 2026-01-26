import { Router } from 'express';
import proctoringController from '../controller/proctoring.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/proctoring/log', proctoringController.logActivity.bind(proctoringController));
router.get('/proctoring/:attemptId/violations', proctoringController.getViolations.bind(proctoringController));
router.get('/proctoring/:attemptId/logs', proctoringController.getAttemptLogs.bind(proctoringController));
router.get('/proctoring/:attemptId/suspicious', proctoringController.checkSuspiciousActivity.bind(proctoringController));

export default router;

