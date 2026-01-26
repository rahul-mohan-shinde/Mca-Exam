# Code Skeleton: Registration Feature

## Backend Implementation

### Auth Controller - Register Method

```typescript
// Step 1: Import dependencies
import { Request, Response, NextFunction } from 'express';

// Step 2: Implement register handler
async register(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Step 2.1: Extract registration data
    const { name, email, password, confirmPassword } = req.body;

    // Step 2.2: Validate input
    // Developer will implement: Check name, email, password validation

    // Step 2.3: Check password match
    if (password !== confirmPassword) {
      res.status(400).json({ message: 'Passwords do not match' });
      return;
    }

    // Step 2.4: Call registration service
    const result = await this.authService.register({
      name,
      email,
      password
    });

    // Step 2.5: Return success response
    res.status(201).json({
      success: true,
      message: 'Registration successful. Please verify your email.',
      userId: result.userId
    });
  } catch (error) {
    // Developer will implement: Error handling
    next(error);
  }
}
```

### Auth Service - Register Method

```typescript
// Step 1: Implement registration method
async register(userData: {
  name: string;
  email: string;
  password: string;
}): Promise<{ userId: string }> {
  // Step 1.1: Check if email exists
  const existingUser = await this.userModel.findByEmail(userData.email);
  if (existingUser) {
    throw new AppError('Email already registered', 409);
  }

  // Step 1.2: Hash password
  const passwordHash = await this.passwordService.hash(userData.password);

  // Step 1.3: Generate verification token
  const verificationToken = this.generateVerificationToken();

  // Step 1.4: Create user record
  const user = await this.userModel.create({
    name: userData.name,
    email: userData.email.toLowerCase(),
    password_hash: passwordHash,
    role_id: DEFAULT_STUDENT_ROLE_ID,
    is_verified: false,
    verification_token: verificationToken,
    verification_token_expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  });

  // Step 1.5: Send verification email (async, don't block)
  this.emailService.sendVerificationEmail(user.email, verificationToken)
    .catch(err => logger.error('Failed to send verification email', err));

  // Step 1.6: Return result
  return { userId: user.id };
}
```

## Frontend Implementation

### Register Component

```typescript
// Step 1: Create registration form
registerForm = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(2)]],
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, this.passwordValidator]],
  confirmPassword: ['', [Validators.required]]
}, { validators: this.passwordMatchValidator });

// Step 2: Implement password strength validator
passwordValidator(control: AbstractControl): ValidationErrors | null {
  // Developer will implement: Check uppercase, lowercase, number, special char
  const value = control.value;
  if (!value) return null;
  
  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecial = /[!@#$%^&*]/.test(value);
  
  if (hasUpper && hasLower && hasNumber && hasSpecial && value.length >= 8) {
    return null;
  }
  return { weakPassword: true };
}

// Step 3: Implement form submission
onSubmit(): void {
  if (this.registerForm.valid) {
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigate(['/verify-email']);
      },
      error: (error) => {
        this.errorMessage = error.error?.message;
      }
    });
  }
}
```

