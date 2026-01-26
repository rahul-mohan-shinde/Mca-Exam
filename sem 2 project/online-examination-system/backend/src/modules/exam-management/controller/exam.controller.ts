import { Request, Response, NextFunction } from 'express';
import examService from '../service/exam.service';

export class ExamController {
  // Step 1: Create exam
  async createExam(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = (req as any).user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }
      const exam = await examService.createExam(req.body, userId);
      res.status(201).json({ success: true, data: exam });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Step 2: Generate question paper
  async generateQuestionPaper(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { examId, questionPool, difficultyRatio } = req.body;
      if (!examId || !questionPool || questionPool.length === 0) {
        res.status(400).json({ success: false, message: 'Exam ID and question pool are required' });
        return;
      }
      const questions = await examService.generateQuestionPaper(examId, questionPool, difficultyRatio);
      res.status(200).json({ success: true, data: questions });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Step 3: Get all exams
  async getAllExams(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const exams = await examService.getAllExams(req.query);
      res.status(200).json({ success: true, data: exams });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Step 4: Get exam by ID
  async getExamById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const exam = await examService.getExamById(req.params.id);
      if (!exam) {
        res.status(404).json({ success: false, message: 'Exam not found' });
        return;
      }
      res.status(200).json({ success: true, data: exam });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Step 5: Get exam questions
  async getExamQuestions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const questions = await examService.getExamQuestions(req.params.id);
      res.status(200).json({ success: true, data: questions });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Step 6: Update exam
  async updateExam(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const exam = await examService.updateExam(req.params.id, req.body);
      res.status(200).json({ success: true, data: exam });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Step 7: Delete exam
  async deleteExam(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await examService.deleteExam(req.params.id);
      res.status(200).json({ success: true, message: 'Exam deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new ExamController();
