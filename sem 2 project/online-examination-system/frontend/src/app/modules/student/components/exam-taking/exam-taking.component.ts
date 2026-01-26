import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../../services/student.service';
import { ExamService } from '../../../../services/exam.service';
import { interval, Subscription } from 'rxjs';
import { ErrorHandler } from '../../../../utils/error-handler';

@Component({
  selector: 'app-exam-taking',
  templateUrl: './exam-taking.component.html',
  styleUrls: ['./exam-taking.component.scss']
})
export class ExamTakingComponent implements OnInit, OnDestroy {
  examId: string = '';
  attemptId: string = '';
  questions: any[] = [];
  answers: Map<string, any> = new Map();
  currentQuestionIndex = 0;
  timeRemaining: number = 0;
  examDuration: number = 0;
  timerSubscription?: Subscription;
  isLoading = false;
  errorMessage = '';
  isSubmitting = false;
  autoSaveInterval?: Subscription;
  lastSavedTime: Date | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.params['examId'];
    
    if (!this.examId) {
      this.errorMessage = 'Invalid exam ID';
      setTimeout(() => this.router.navigate(['/student']), 2000);
      return;
    }

    this.startExam();
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    if (this.autoSaveInterval) {
      this.autoSaveInterval.unsubscribe();
    }
    // Auto-save answers before leaving
    if (this.attemptId && this.answers.size > 0) {
      this.autoSaveAllAnswers();
    }
  }

  // Step 1: Start exam
  startExam(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.studentService.startExam(this.examId).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.attemptId = response.data._id;
          
          // Get exam details to get duration
          this.examService.getExamById(this.examId).subscribe({
            next: (examResponse) => {
              if (examResponse.success && examResponse.data) {
                this.examDuration = examResponse.data.duration || 60;
                this.timeRemaining = this.examDuration * 60; // Convert to seconds
                
                // Validate exam is still active
                if (examResponse.data.status !== 'ACTIVE') {
                  this.errorMessage = 'This exam is not currently active';
                  this.isLoading = false;
                  return;
                }

                this.loadQuestions();
                this.startTimer();
                this.startAutoSave();
              } else {
                this.errorMessage = 'Failed to load exam details';
                this.isLoading = false;
              }
            },
            error: (error) => {
              ErrorHandler.logError(error, 'ExamTakingComponent.startExam (getExamById)');
              this.errorMessage = ErrorHandler.getErrorMessage(error);
              this.isLoading = false;
            }
          });
        } else {
          this.errorMessage = response.message || 'Failed to start exam';
          this.isLoading = false;
        }
      },
      error: (error) => {
        ErrorHandler.logError(error, 'ExamTakingComponent.startExam');
        this.errorMessage = ErrorHandler.getErrorMessage(error);
        this.isLoading = false;
      }
    });
  }

  // Step 2: Load questions
  loadQuestions(): void {
    this.studentService.getExamQuestions(this.examId).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.questions = Array.isArray(response.data) ? response.data : [];
          
          if (this.questions.length === 0) {
            this.errorMessage = 'No questions available for this exam';
          }
        } else {
          this.errorMessage = 'Failed to load questions';
        }
        this.isLoading = false;
      },
      error: (error) => {
        ErrorHandler.logError(error, 'ExamTakingComponent.loadQuestions');
        this.errorMessage = ErrorHandler.getErrorMessage(error);
        this.isLoading = false;
      }
    });
  }

  // Step 3: Start timer
  startTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
        
        // Warn when 5 minutes remaining
        if (this.timeRemaining === 300) {
          alert('Warning: 5 minutes remaining!');
        }
        
        // Warn when 1 minute remaining
        if (this.timeRemaining === 60) {
          alert('Warning: 1 minute remaining!');
        }
      } else {
        // Auto-submit when time is up
        if (!this.isSubmitting) {
          alert('Time is up! Submitting your exam automatically.');
          this.submitExam();
        }
      }
    });
  }

  // Get formatted time remaining
  getFormattedTime(): string {
    const hours = Math.floor(this.timeRemaining / 3600);
    const minutes = Math.floor((this.timeRemaining % 3600) / 60);
    const seconds = this.timeRemaining % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  // Check if time is running low
  isTimeRunningLow(): boolean {
    return this.timeRemaining < 300; // Less than 5 minutes
  }

  // Step 4: Save answer
  saveAnswer(questionId: string, answer: any): void {
    if (!questionId || !this.attemptId) {
      return;
    }

    // Validate answer data
    if (!answer || (!answer.selected_option_id && !answer.answer_text)) {
      this.errorMessage = 'Please provide an answer';
      return;
    }

    this.answers.set(questionId, answer);
    this.lastSavedTime = new Date();
    
    const answerData: any = {};
    if (answer.selected_option_id) {
      answerData.selected_option_id = answer.selected_option_id;
    }
    if (answer.answer_text) {
      answerData.answer_text = answer.answer_text.trim();
    }
    
    this.studentService.saveAnswer(this.attemptId, questionId, answerData).subscribe({
      next: () => {
        // Answer saved successfully
      },
      error: (error) => {
        ErrorHandler.logError(error, 'ExamTakingComponent.saveAnswer');
        // Don't show error for every save, just log it
        // Only show critical errors
        if (ErrorHandler.isNetworkError(error)) {
          this.errorMessage = 'Network error. Your answer may not be saved. Please check your connection.';
        }
      }
    });
  }

  // Auto-save all answers periodically
  startAutoSave(): void {
    this.autoSaveInterval = interval(30000).subscribe(() => {
      if (this.answers.size > 0 && this.attemptId) {
        this.autoSaveAllAnswers();
      }
    });
  }

  // Auto-save all answers
  autoSaveAllAnswers(): void {
    this.answers.forEach((answer, questionId) => {
      if (this.attemptId) {
        const answerData: any = {};
        if (answer.selected_option_id) {
          answerData.selected_option_id = answer.selected_option_id;
        }
        if (answer.answer_text) {
          answerData.answer_text = answer.answer_text.trim();
        }
        
        this.studentService.saveAnswer(this.attemptId, questionId, answerData).subscribe({
          error: (error) => {
            ErrorHandler.logError(error, 'ExamTakingComponent.autoSaveAllAnswers');
          }
        });
      }
    });
  }

  // Step 5: Submit exam
  submitExam(): void {
    if (!this.attemptId) {
      this.errorMessage = 'Invalid attempt ID';
      return;
    }

    // Check if already submitting
    if (this.isSubmitting) {
      return;
    }

    // Warn if no answers provided
    if (this.answers.size === 0) {
      if (!confirm('You have not answered any questions. Are you sure you want to submit?')) {
        return;
      }
    } else {
      const unansweredCount = this.questions.length - this.answers.size;
      if (unansweredCount > 0) {
        if (!confirm(`You have ${unansweredCount} unanswered question(s). Are you sure you want to submit?`)) {
          return;
        }
      } else {
        if (!confirm('Are you sure you want to submit the exam? You cannot change your answers after submission.')) {
          return;
        }
      }
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    // Final auto-save before submission
    this.autoSaveAllAnswers();

    this.studentService.submitExam(this.attemptId).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        if (response.success) {
          this.router.navigate(['/student/results', this.attemptId]);
        } else {
          this.errorMessage = response.message || 'Failed to submit exam';
        }
      },
      error: (error) => {
        this.isSubmitting = false;
        ErrorHandler.logError(error, 'ExamTakingComponent.submitExam');
        this.errorMessage = ErrorHandler.getErrorMessage(error);
      }
    });
  }

  // Step 6: Format time
  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // Step 7: Get current question
  get currentQuestion(): any {
    if (this.questions && this.questions.length > 0 && this.currentQuestionIndex >= 0 && this.currentQuestionIndex < this.questions.length) {
      return this.questions[this.currentQuestionIndex];
    }
    return null;
  }

  // Navigation methods with validation
  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  goToQuestion(index: number): void {
    if (index >= 0 && index < this.questions.length) {
      this.currentQuestionIndex = index;
    }
  }

  // Check if question is answered
  isQuestionAnswered(questionId: string): boolean {
    return this.answers.has(questionId);
  }

  // Get answer status for all questions
  getAnswerStatus(): { answered: number; total: number; unanswered: number } {
    return {
      answered: this.answers.size,
      total: this.questions.length,
      unanswered: this.questions.length - this.answers.size
    };
  }

  // Step 8: Navigate to question
  goToQuestion(index: number): void {
    this.currentQuestionIndex = index;
  }

  // Step 9: Previous question
  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  // Step 10: Next question
  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }
}

