import { Request, Response, NextFunction } from 'express';
import studentService from '../service/student.service';

export class StudentController {
  // Step 1: Start exam
  async startExam(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const studentId = (req as any).user?.userId;
      const { examId } = req.body;
      const attempt = await studentService.startExamAttempt(examId, studentId);
      res.status(200).json({ success: true, data: attempt });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Step 2: Get exam questions
  async getExamQuestions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const questions = await studentService.getExamQuestions(req.params.examId);
      res.status(200).json({ success: true, data: questions });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Step 3: Save answer
  async saveAnswer(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { attemptId, questionId, answerData } = req.body;
      const answer = await studentService.saveAnswer(attemptId, questionId, answerData);
      res.status(200).json({ success: true, data: answer });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Step 4: Submit exam
  async submitExam(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { attemptId } = req.body;
      const result = await studentService.submitExam(attemptId);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Step 5: Get student attempts
  async getStudentAttempts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const studentId = (req as any).user?.userId;
      const attempts = await studentService.getStudentAttempts(studentId);
      res.status(200).json({ success: true, data: attempts });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new StudentController();

