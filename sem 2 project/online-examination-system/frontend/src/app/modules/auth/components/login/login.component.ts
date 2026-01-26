import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { ErrorHandler } from '../../../../utils/error-handler';
import { CustomValidators } from '../../../../utils/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Step 1: Initialize form with enhanced validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, CustomValidators.emailFormat()]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    // Step 2: Check if already logged in
    if (this.authService.isAuthenticated()) {
      this.redirectBasedOnRole();
    }

    // Check for registration success message
    const params = new URLSearchParams(window.location.search);
    if (params.get('registered') === 'true') {
      // Show success message (you can implement a toast service)
      setTimeout(() => {
        // Clear the message after 3 seconds
      }, 3000);
    }
  }

  // Step 3: Form submission with enhanced validation
  onSubmit(): void {
    // Step 3.1: Check if form is valid
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    // Step 3.2: Set loading state
    this.isLoading = true;
    this.errorMessage = '';

    // Step 3.3: Extract and trim form values
    const credentials = {
      email: this.loginForm.value.email.trim().toLowerCase(),
      password: this.loginForm.value.password
    };

    // Step 3.4: Call authentication service
    this.authService.login(credentials).subscribe({
      next: (response) => {
        // Step 3.5: Handle success
        this.isLoading = false;
        if (response.success) {
          this.redirectBasedOnRole(response.user.role);
        } else {
          this.errorMessage = response.message || 'Login failed. Please try again.';
        }
      },
      error: (error) => {
        // Step 3.6: Handle error with proper error handling
        this.isLoading = false;
        ErrorHandler.logError(error, 'LoginComponent.onSubmit');
        this.errorMessage = ErrorHandler.getErrorMessage(error);
      }
    });
  }

  // Step 4: Helper method for form validation
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Step 5: Helper method for role-based redirection
  private redirectBasedOnRole(role?: string): void {
    const userRole = role || this.authService.getCurrentUser()?.role;
    const roleMap: { [key: string]: string } = {
      'admin': '/admin',
      'super_admin': '/admin',
      'examiner': '/admin',
      'student': '/student'
    };
    const redirectPath = roleMap[userRole] || '/student';
    this.router.navigate([redirectPath]);
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Get field error message
  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors['email'] || field.errors['invalidEmail']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        return `Password must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
    }
    return '';
  }
}
