import { Request, Response, NextFunction } from 'express';
import questionService from '../service/question.service';

export class QuestionController {
  // Step 1: Create question
  async createQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = (req as any).user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const question = await questionService.createQuestion(req.body, userId);
      res.status(201).json({ success: true, data: question });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Step 2: Get all questions
  async getAllQuestions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const questions = await questionService.getAllQuestions(req.query);
      res.status(200).json({ success: true, data: questions });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Step 3: Get question by ID
  async getQuestionById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const question = await questionService.getQuestionById(req.params.id);
      if (!question) {
        res.status(404).json({ success: false, message: 'Question not found' });
        return;
      }
      res.status(200).json({ success: true, data: question });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Step 4: Update question
  async updateQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const question = await questionService.updateQuestion(req.params.id, req.body);
      res.status(200).json({ success: true, data: question });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Step 5: Delete question
  async deleteQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await questionService.deleteQuestion(req.params.id);
      res.status(200).json({ success: true, message: 'Question deleted' });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Step 6: Create category
  async createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const category = await questionService.createCategory(req.body);
      res.status(201).json({ success: true, data: category });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Step 7: Get all categories
  async getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categories = await questionService.getAllCategories();
      res.status(200).json({ success: true, data: categories });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new QuestionController();

