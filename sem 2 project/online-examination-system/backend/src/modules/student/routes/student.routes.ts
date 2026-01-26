import { Router } from 'express';
import studentController from '../controller/student.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { requireRole } from '../../../middlewares/role.middleware';

const router = Router();

router.use(authMiddleware);
router.use(requireRole(['student']));

router.post('/start-exam', studentController.startExam.bind(studentController));
router.get('/exams/:examId/questions', studentController.getExamQuestions.bind(studentController));
router.post('/save-answer', studentController.saveAnswer.bind(studentController));
router.post('/submit-exam', studentController.submitExam.bind(studentController));
router.get('/attempts', studentController.getStudentAttempts.bind(studentController));

export default router;

