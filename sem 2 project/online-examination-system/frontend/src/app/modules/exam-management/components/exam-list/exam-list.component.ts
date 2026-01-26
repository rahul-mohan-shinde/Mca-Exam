import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamService } from '../../../../services/exam.service';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.scss']
})
export class ExamListComponent implements OnInit {
  exams: any[] = [];
  isLoading = false;

  constructor(
    private examService: ExamService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadExams();
  }

  // Step 1: Load exams
  loadExams(): void {
    this.isLoading = true;
    this.examService.getAllExams().subscribe({
      next: (response) => {
        if (response.success) {
          this.exams = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading exams:', error);
        this.isLoading = false;
      }
    });
  }

  // Step 2: Create new exam
  createExam(): void {
    this.router.navigate(['/exams/create']);
  }

  // Step 3: View exam
  viewExam(id: string): void {
    this.router.navigate(['/exams/edit', id]);
  }

  // Step 4: Delete exam
  deleteExam(id: string): void {
    if (confirm('Are you sure you want to delete this exam?')) {
      this.examService.deleteExam(id).subscribe({
        next: () => {
          this.loadExams();
        },
        error: (error) => {
          console.error('Error deleting exam:', error);
          alert('Failed to delete exam. Please try again.');
        }
      });
    }
  }
}

