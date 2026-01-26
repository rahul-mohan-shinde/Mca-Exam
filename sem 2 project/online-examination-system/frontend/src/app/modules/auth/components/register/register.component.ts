import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { ErrorHandler } from '../../../../utils/error-handler';
import { CustomValidators } from '../../../../utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Step 1: Initialize form with enhanced validators
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), CustomValidators.noLeadingTrailingSpaces()]],
      email: ['', [Validators.required, CustomValidators.emailFormat()]],
      password: ['', [Validators.required, CustomValidators.passwordStrength()]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  // Step 2: Password strength validator (using CustomValidators)
  get passwordStrengthErrors(): any {
    const passwordControl = this.registerForm.get('password');
    if (passwordControl?.errors?.['weakPassword']) {
      return passwordControl.errors['passwordRequirements'];
    }
    return null;
  }

  // Step 3: Password match validator
  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  // Step 4: Form submission with enhanced validation
  onSubmit(): void {
    // Step 4.1: Check if form is valid
    if (this.registerForm.invalid) {
      this.markFormGroupTouched(this.registerForm);
      this.errorMessage = 'Please fix all validation errors before submitting.';
      return;
    }

    // Step 4.2: Set loading state
    this.isLoading = true;
    this.errorMessage = '';

    // Step 4.3: Extract and trim form values
    const registerData = {
      name: this.registerForm.value.name.trim(),
      email: this.registerForm.value.email.trim().toLowerCase(),
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword
    };

    // Step 4.4: Call registration service
    this.authService.register(registerData).subscribe({
      next: (response) => {
        // Step 4.5: Handle success
        this.isLoading = false;
        if (response.success) {
          this.router.navigate(['/login'], {
            queryParams: { registered: 'true' }
          });
        } else {
          this.errorMessage = response.message || 'Registration failed. Please try again.';
        }
      },
      error: (error) => {
        // Step 4.6: Handle error with proper error handling
        this.isLoading = false;
        ErrorHandler.logError(error, 'RegisterComponent.onSubmit');
        this.errorMessage = ErrorHandler.getErrorMessage(error);
      }
    });
  }

  // Step 5: Helper method for form validation
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Get field error message
  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors['minlength']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['maxlength']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be less than ${field.errors['maxlength'].requiredLength} characters`;
      }
      if (field.errors['email'] || field.errors['invalidEmail']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['weakPassword']) {
        return 'Password does not meet requirements';
      }
      if (field.errors['passwordMismatch']) {
        return 'Passwords do not match';
      }
      if (field.errors['hasLeadingTrailingSpaces']) {
        return 'Cannot have leading or trailing spaces';
      }
    }
    return '';
  }
}
