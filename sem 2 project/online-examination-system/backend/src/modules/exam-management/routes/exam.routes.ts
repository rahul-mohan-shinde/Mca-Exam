import { Router } from 'express';
import examController from '../controller/exam.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/exams', examController.createExam.bind(examController));
router.post('/exams/generate-paper', examController.generateQuestionPaper.bind(examController));
router.get('/exams', examController.getAllExams.bind(examController));
router.get('/exams/:id', examController.getExamById.bind(examController));
router.get('/exams/:id/questions', examController.getExamQuestions.bind(examController));
router.put('/exams/:id', examController.updateExam.bind(examController));
router.delete('/exams/:id', examController.deleteExam.bind(examController));

export default router;

