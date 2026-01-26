import { Router } from 'express';
import resultController from '../controller/result.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/calculate', resultController.calculateResult.bind(resultController));
router.get('/:attemptId', resultController.getResult.bind(resultController));
router.get('/analytics', resultController.getAnalytics.bind(resultController));

export default router;

