import { Router } from 'express';
import questionController from '../controller/question.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Question routes
router.post('/questions', questionController.createQuestion.bind(questionController));
router.get('/questions', questionController.getAllQuestions.bind(questionController));
router.get('/questions/:id', questionController.getQuestionById.bind(questionController));
router.put('/questions/:id', questionController.updateQuestion.bind(questionController));
router.delete('/questions/:id', questionController.deleteQuestion.bind(questionController));

// Category routes
router.post('/categories', questionController.createCategory.bind(questionController));
router.get('/categories', questionController.getAllCategories.bind(questionController));

export default router;

