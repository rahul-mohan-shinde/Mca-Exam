# Code Skeleton: Admin Dashboard

## Backend Controller

```typescript
async getDashboard(req: Request, res: Response): Promise<void> {
  // Step 1: Get statistics
  const stats = await this.adminService.getStatistics();
  
  // Step 2: Get recent activities
  const activities = await this.adminService.getRecentActivities();
  
  // Step 3: Get performance metrics
  const metrics = await this.adminService.getPerformanceMetrics();
  
  // Step 4: Return dashboard data
  res.json({
    statistics: stats,
    recentActivities: activities,
    performanceMetrics: metrics
  });
}
```

