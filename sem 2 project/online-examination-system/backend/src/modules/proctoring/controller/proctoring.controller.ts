import { Request, Response, NextFunction } from 'express';
import proctoringService from '../service/proctoring.service';

export class ProctoringController {
  // Step 1: Log activity
  async logActivity(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const log = await proctoringService.logActivity(req.body);
      res.status(201).json({ success: true, data: log });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Step 2: Get violations
  async getViolations(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const violations = await proctoringService.detectViolations(req.params.attemptId);
      res.status(200).json({ success: true, data: violations });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Step 3: Get attempt logs
  async getAttemptLogs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const logs = await proctoringService.getAttemptLogs(req.params.attemptId);
      res.status(200).json({ success: true, data: logs });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Step 4: Check suspicious activity
  async checkSuspiciousActivity(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await proctoringService.checkSuspiciousActivity(req.params.attemptId);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new ProctoringController();

