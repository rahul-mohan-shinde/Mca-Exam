import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  statistics: any = {};
  performanceMetrics: any = {};
  recentActivities: any[] = [];
  isLoading = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  // Step 1: Load dashboard data
  loadDashboardData(): void {
    this.isLoading = true;
    this.adminService.getDashboard().subscribe({
      next: (response) => {
        if (response.success) {
          this.statistics = response.data.statistics;
          this.performanceMetrics = response.data.performanceMetrics;
          this.recentActivities = response.data.recentActivities;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard:', error);
        this.isLoading = false;
      }
    });
  }
}

