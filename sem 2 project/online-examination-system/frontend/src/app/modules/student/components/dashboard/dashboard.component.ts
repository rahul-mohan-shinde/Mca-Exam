import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../../../services/student.service';
import { ExamService } from '../../../../services/exam.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {
  upcomingExams: any[] = [];
  recentAttempts: any[] = [];
  isLoading = false;

  constructor(
    private studentService: StudentService,
    private examService: ExamService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  // Step 1: Load dashboard data
  loadDashboardData(): void {
    this.isLoading = true;
    
    // Load upcoming exams
    this.examService.getAllExams({ status: 'ACTIVE' }).subscribe({
      next: (response) => {
        if (response.success) {
          this.upcomingExams = response.data;
        }
      }
    });

    // Load recent attempts
    this.studentService.getStudentAttempts().subscribe({
      next: (response) => {
        if (response.success) {
          this.recentAttempts = response.data.slice(0, 5);
        }
        this.isLoading = false;
      }
    });
  }

  // Step 2: Start exam
  startExam(examId: string): void {
    this.router.navigate(['/student/exam', examId]);
  }

  // Step 3: View result
  viewResult(attemptId: string): void {
    this.router.navigate(['/student/results', attemptId]);
  }
}

