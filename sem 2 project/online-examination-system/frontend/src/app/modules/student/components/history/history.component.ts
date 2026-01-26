import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../../../services/student.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  attempts: any[] = [];
  isLoading = false;

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  // Step 1: Load exam history
  loadHistory(): void {
    this.isLoading = true;
    this.studentService.getStudentAttempts().subscribe({
      next: (response) => {
        if (response.success) {
          this.attempts = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading history:', error);
        this.isLoading = false;
      }
    });
  }

  // Step 2: View result
  viewResult(attemptId: string): void {
    this.router.navigate(['/student/results', attemptId]);
  }
}

