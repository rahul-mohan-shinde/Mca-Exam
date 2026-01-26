import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService, Question } from '../../../../services/question.service';
import { CustomValidators } from '../../../../utils/validators';
import { ErrorHandler } from '../../../../utils/error-handler';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {
  questionForm: FormGroup;
  categories: any[] = [];
  isEditMode = false;
  questionId: string | null = null;

  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.questionForm = this.fb.group({
      question_text: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000), CustomValidators.noLeadingTrailingSpaces()]],
      question_type: ['MCQ', Validators.required],
      category_id: [''],
      difficulty_level: ['MEDIUM', Validators.required],
      marks: [1, [Validators.required, CustomValidators.marks()]],
      options: this.fb.array([], [CustomValidators.minimumOptions(2), CustomValidators.maximumOptions(6)])
    }, { validators: [this.validateMCQOptions.bind(this)] });
  }

  // Custom validator for MCQ options
  validateMCQOptions(control: AbstractControl): { [key: string]: any } | null {
    const questionType = control.get('question_type')?.value;
    const options = control.get('options')?.value;

    if (questionType === 'MCQ') {
      if (!options || options.length < 2) {
        return { insufficientOptions: true };
      }

      // Check for at least one correct option
      const hasCorrect = options.some((opt: any) => opt.is_correct === true);
      if (!hasCorrect) {
        return { noCorrectOption: true };
      }

      // Check for duplicate options
      const optionTexts = options.map((opt: any) => opt.text?.trim().toLowerCase()).filter(Boolean);
      const uniqueOptions = new Set(optionTexts);
      if (uniqueOptions.size !== optionTexts.length) {
        return { duplicateOptions: true };
      }
    }

    return null;
  }

  ngOnInit(): void {
    this.loadCategories();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.questionId = params['id'];
        this.loadQuestion(params['id']);
      }
    });

    // Add default options for MCQ
    this.questionForm.get('question_type')?.valueChanges.subscribe(type => {
      if (type === 'MCQ') {
        this.addDefaultOptions();
      } else {
        this.clearOptions();
      }
    });
  }

  // Step 1: Load categories
  loadCategories(): void {
    this.questionService.getAllCategories().subscribe({
      next: (response) => {
        if (response.success) {
          this.categories = response.data || [];
        }
      },
      error: (error) => {
        ErrorHandler.logError(error, 'QuestionFormComponent.loadCategories');
        this.errorMessage = ErrorHandler.getErrorMessage(error);
      }
    });
  }

  // Step 2: Load question for edit
  loadQuestion(id: string): void {
    if (!id) {
      this.errorMessage = 'Invalid question ID';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.questionService.getQuestionById(id).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success && response.data) {
          const question = response.data;
          this.questionForm.patchValue({
            question_text: question.question_text || '',
            question_type: question.question_type || 'MCQ',
            category_id: question.category_id?._id || question.category_id || '',
            difficulty_level: question.difficulty_level || 'MEDIUM',
            marks: question.marks || 1
          });

          if (question.question_type === 'MCQ' && question.options && Array.isArray(question.options)) {
            this.clearOptions();
            question.options.forEach((opt: any) => {
              this.addOption(opt.option_text || opt.text || '', opt.is_correct || false);
            });
          }
        } else {
          this.errorMessage = 'Question not found';
        }
      },
      error: (error) => {
        this.isLoading = false;
        ErrorHandler.logError(error, 'QuestionFormComponent.loadQuestion');
        this.errorMessage = ErrorHandler.getErrorMessage(error);
      }
    });
  }

  // Step 3: Get options form array
  get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  // Step 4: Add option
  addOption(text: string = '', isCorrect: boolean = false): void {
    if (this.options.length >= 6) {
      this.errorMessage = 'Maximum 6 options allowed';
      return;
    }

    this.options.push(this.fb.group({
      text: [text, [Validators.required, Validators.minLength(1), Validators.maxLength(500), CustomValidators.noLeadingTrailingSpaces()]],
      is_correct: [isCorrect]
    }));

    // Update validators after adding option
    this.updateOptionsValidators();
  }

  // Update validators for options array
  private updateOptionsValidators(): void {
    this.questionForm.get('options')?.updateValueAndValidity();
  }

  // Step 5: Remove option
  removeOption(index: number): void {
    if (this.options.length <= 2) {
      this.errorMessage = 'At least 2 options are required for MCQ';
      return;
    }

    this.options.removeAt(index);
    this.updateOptionsValidators();
  }

  // Step 6: Add default options
  addDefaultOptions(): void {
    if (this.options.length === 0) {
      for (let i = 0; i < 4; i++) {
        this.addOption();
      }
    }
  }

  // Step 7: Clear options
  clearOptions(): void {
    while (this.options.length !== 0) {
      this.options.removeAt(0);
    }
  }

  // Step 8: Submit form
  onSubmit(): void {
    // Mark all fields as touched
    this.markFormGroupTouched(this.questionForm);

    // Check form validity
    if (this.questionForm.invalid) {
      this.errorMessage = 'Please fix all validation errors before submitting.';
      return;
    }

    // Additional validation for MCQ
    if (this.questionForm.value.question_type === 'MCQ') {
      const options = this.questionForm.value.options;
      if (!options || options.length < 2) {
        this.errorMessage = 'MCQ questions require at least 2 options';
        return;
      }

      const hasCorrect = options.some((opt: any) => opt.is_correct === true);
      if (!hasCorrect) {
        this.errorMessage = 'MCQ questions must have at least one correct option';
        return;
      }

      // Check for empty option texts
      const hasEmptyOptions = options.some((opt: any) => !opt.text || opt.text.trim() === '');
      if (hasEmptyOptions) {
        this.errorMessage = 'All options must have text';
        return;
      }
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formValue = this.questionForm.value;
    const questionData: Question = {
      question_text: formValue.question_text.trim(),
      question_type: formValue.question_type,
      category_id: formValue.category_id || undefined,
      difficulty_level: formValue.difficulty_level,
      marks: Number(formValue.marks),
      options: formValue.question_type === 'MCQ' ? formValue.options.map((opt: any) => ({
        text: opt.text.trim(),
        is_correct: opt.is_correct || false
      })) : undefined
    };

    if (this.isEditMode && this.questionId) {
      this.questionService.updateQuestion(this.questionId, questionData).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            this.router.navigate(['/questions']);
          } else {
            this.errorMessage = response.message || 'Failed to update question';
          }
        },
        error: (error) => {
          this.isLoading = false;
          ErrorHandler.logError(error, 'QuestionFormComponent.onSubmit (update)');
          this.errorMessage = ErrorHandler.getErrorMessage(error);
        }
      });
    } else {
      this.questionService.createQuestion(questionData).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            this.router.navigate(['/questions']);
          } else {
            this.errorMessage = response.message || 'Failed to create question';
          }
        },
        error: (error) => {
          this.isLoading = false;
          ErrorHandler.logError(error, 'QuestionFormComponent.onSubmit (create)');
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

      if (control instanceof FormArray) {
        control.controls.forEach(arrayControl => {
          if (arrayControl instanceof FormGroup) {
            this.markFormGroupTouched(arrayControl);
          } else {
            arrayControl.markAsTouched();
          }
        });
      } else if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Step 9: Cancel
  cancel(): void {
    this.router.navigate(['/questions']);
  }
}

