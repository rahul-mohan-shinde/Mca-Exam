import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService, Exam } from '../../../../services/exam.service';
import { CustomValidators } from '../../../../utils/validators';
import { ErrorHandler } from '../../../../utils/error-handler';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.scss']
})
export class ExamFormComponent implements OnInit {
  examForm: FormGroup;
  isEditMode = false;
  examId: string | null = null;
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private examService: ExamService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.examForm = this.fb.group({
      exam_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200), CustomValidators.noLeadingTrailingSpaces()]],
      description: ['', [Validators.maxLength(1000)]],
      duration: [60, [Validators.required, CustomValidators.duration()]],
      total_marks: [100, [Validators.required, CustomValidators.marks()]],
      passing_score: [50, [Validators.required, CustomValidators.percentage()]],
      start_time: ['', [Validators.required, CustomValidators.dateNotPast()]],
      end_time: ['', [Validators.required]],
      status: ['DRAFT', Validators.required]
    }, { validators: [this.validateExamDates.bind(this), this.validatePassingScore.bind(this)] });
  }

  // Custom validator for exam dates
  validateExamDates(control: AbstractControl): { [key: string]: any } | null {
    const startTime = control.get('start_time')?.value;
    const endTime = control.get('end_time')?.value;

    if (startTime && endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);

      if (end <= start) {
        return { endDateBeforeStart: true };
      }

      // Check if exam duration is reasonable (max 24 hours)
      const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      if (durationHours > 24) {
        return { examDurationTooLong: true };
      }
    }

    return null;
  }

  // Custom validator for passing score
  validatePassingScore(control: AbstractControl): { [key: string]: any } | null {
    const passingScore = control.get('passing_score')?.value;
    const totalMarks = control.get('total_marks')?.value;

    if (passingScore && totalMarks) {
      if (passingScore > totalMarks) {
        return { passingScoreExceedsTotal: true };
      }
    }

    return null;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.examId = params['id'];
        this.loadExam(params['id']);
      }
    });
  }

  // Step 1: Load exam for edit
  loadExam(id: string): void {
    if (!id) {
      this.errorMessage = 'Invalid exam ID';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.examService.getExamById(id).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success && response.data) {
          const exam = response.data;
          try {
            this.examForm.patchValue({
              exam_name: exam.exam_name || '',
              description: exam.description || '',
              duration: exam.duration || 60,
              total_marks: exam.total_marks || 100,
              passing_score: exam.passing_score || 50,
              start_time: exam.start_time ? new Date(exam.start_time).toISOString().slice(0, 16) : '',
              end_time: exam.end_time ? new Date(exam.end_time).toISOString().slice(0, 16) : '',
              status: exam.status || 'DRAFT'
            });
          } catch (error) {
            ErrorHandler.logError(error, 'ExamFormComponent.loadExam');
            this.errorMessage = 'Error loading exam data';
          }
        } else {
          this.errorMessage = 'Exam not found';
        }
      },
      error: (error) => {
        this.isLoading = false;
        ErrorHandler.logError(error, 'ExamFormComponent.loadExam');
        this.errorMessage = ErrorHandler.getErrorMessage(error);
      }
    });
  }

  // Step 2: Submit form
  onSubmit(): void {
    // Mark all fields as touched
    this.markFormGroupTouched(this.examForm);

    // Check form validity
    if (this.examForm.invalid) {
      this.errorMessage = 'Please fix all validation errors before submitting.';
      return;
    }

    // Additional validation
    const formValue = this.examForm.value;
    const startTime = new Date(formValue.start_time);
    const endTime = new Date(formValue.end_time);
    const now = new Date();

    // Check if start time is in the past (for new exams)
    if (!this.isEditMode && startTime < now) {
      this.errorMessage = 'Start time cannot be in the past';
      return;
    }

    // Check if end time is after start time
    if (endTime <= startTime) {
      this.errorMessage = 'End time must be after start time';
      return;
    }

    // Check if passing score is valid
    if (formValue.passing_score > formValue.total_marks) {
      this.errorMessage = 'Passing score cannot exceed total marks';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const examData: Exam = {
      exam_name: formValue.exam_name.trim(),
      description: formValue.description?.trim() || '',
      duration: Number(formValue.duration),
      total_marks: Number(formValue.total_marks),
      passing_score: Number(formValue.passing_score),
      start_time: startTime,
      end_time: endTime,
      status: formValue.status
    };

    if (this.isEditMode && this.examId) {
      this.examService.updateExam(this.examId, examData).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            this.router.navigate(['/exams']);
          } else {
            this.errorMessage = response.message || 'Failed to update exam';
          }
        },
        error: (error) => {
          this.isLoading = false;
          ErrorHandler.logError(error, 'ExamFormComponent.onSubmit (update)');
          this.errorMessage = ErrorHandler.getErrorMessage(error);
        }
      });
    } else {
      this.examService.createExam(examData).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            this.router.navigate(['/exams']);
          } else {
            this.errorMessage = response.message || 'Failed to create exam';
          }
        },
        error: (error) => {
          this.isLoading = false;
          ErrorHandler.logError(error, 'ExamFormComponent.onSubmit (create)');
          this.errorMessage = ErrorHandler.getErrorMessage(error);
        }
      });
    }
  }

  // Helper method to mark all form fields as touched
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Step 3: Cancel
  cancel(): void {
    this.router.navigate(['/exams']);
  }
}

