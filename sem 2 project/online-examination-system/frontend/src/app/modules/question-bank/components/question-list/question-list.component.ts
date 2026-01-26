import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService, Question } from '../../../../services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  questions: Question[] = [];
  isLoading = false;
  selectedQuestion: Question | null = null;

  constructor(
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  // Step 1: Load questions
  loadQuestions(): void {
    this.isLoading = true;
    this.questionService.getAllQuestions().subscribe({
      next: (response) => {
        if (response.success) {
          this.questions = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading questions:', error);
        this.isLoading = false;
      }
    });
  }

  // Step 2: Delete question
  deleteQuestion(id: string): void {
    if (confirm('Are you sure you want to delete this question?')) {
      this.questionService.deleteQuestion(id).subscribe({
        next: () => {
          this.loadQuestions();
        },
        error: (error) => {
          console.error('Error deleting question:', error);
        }
      });
    }
  }

  // Step 3: Select question for edit
  selectQuestion(question: Question): void {
    this.router.navigate(['/questions/edit', question._id]);
  }
}

