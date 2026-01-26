import { Request, Response, NextFunction } from 'express';
import resultService from '../service/result.service';

export class ResultController {
  // Step 1: Calculate result
  async calculateResult(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { attemptId } = req.body;
      const result = await resultService.calculateResult(attemptId);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Step 2: Get result
  async getResult(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await resultService.getResult(req.params.attemptId);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  // Step 3: Get analytics
  async getAnalytics(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const analytics = await resultService.getAnalytics(req.query.examId as string);
      res.status(200).json({ success: true, data: analytics });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new ResultController();

