import { Request, Response, NextFunction } from 'express';
import adminService from '../service/admin.service';

export class AdminController {
  // Step 1: Get dashboard data
  async getDashboard(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Step 1.1: Get statistics
      const statistics = await adminService.getStatistics();

      // Step 1.2: Get recent activities
      const activities = await adminService.getRecentActivities();

      // Step 1.3: Get performance metrics
      const metrics = await adminService.getPerformanceMetrics();

      // Step 1.4: Return dashboard data
      res.status(200).json({
        success: true,
        data: {
          statistics,
          recentActivities: activities,
          performanceMetrics: metrics
        }
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch dashboard data'
      });
    }
  }
}

export default new AdminController();

