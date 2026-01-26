# Code Skeleton: Login Feature

## Backend Implementation

### 1. Auth Controller (`backend/controllers/auth.controller.ts`)

```typescript
// Step 1: Import required dependencies
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { logger } from '../utils/logger';

// Step 2: Create controller class
export class AuthController {
  // Step 3: Inject dependencies
  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  // Step 4: Implement login handler
  /**
   * Handle user login request
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Express next function
   */
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Step 4.1: Extract credentials from request body
      const { email, password } = req.body;

      // Step 4.2: Validate input (already validated by middleware, but double-check)
      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
        return;
      }

      // Step 4.3: Call authentication service
      const result = await this.authService.authenticate(email, password);

      // Step 4.4: Log successful login
      logger.info(`User logged in: ${result.user.email}`, {
        userId: result.user.id,
        ipAddress: req.ip
      });

      // Step 4.5: Return success response
      res.status(200).json({
        success: true,
        token: result.token,
        refreshToken: result.refreshToken,
        user: {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          role: result.user.role
        },
        expiresIn: result.expiresIn
      });
    } catch (error) {
      // Step 4.6: Handle errors
      // Developer will implement error handling based on error type
      // - Validation errors → 400
      // - Authentication errors → 401
      // - Rate limit errors → 429
      // - Server errors → 500
      next(error);
    }
  }
}
```

### 2. Auth Service (`backend/services/auth.service.ts`)

```typescript
// Step 1: Import required dependencies
import { UserModel } from '../models/user.model';
import { PasswordService } from './password.service';
import { TokenService } from './token.service';
import { SessionModel } from '../models/session.model';
import { AppError } from '../utils/errors';

// Step 2: Create service class
export class AuthService {
  // Step 3: Inject dependencies
  constructor(
    private userModel: UserModel,
    private passwordService: PasswordService,
    private tokenService: TokenService,
    private sessionModel: SessionModel
  ) {}

  // Step 4: Implement authentication method
  /**
   * Authenticate user with email and password
   * @param email - User email address
   * @param password - User password (plain text)
   * @returns Authentication result with token and user data
   * @throws AppError if authentication fails
   */
  async authenticate(email: string, password: string): Promise<{
    token: string;
    refreshToken: string;
    user: any;
    expiresIn: number;
  }> {
    // Step 4.1: Find user by email
    // Developer will implement: Query database for user
    const user = await this.userModel.findByEmail(email);
    
    // Step 4.2: Check if user exists
    if (!user) {
      // Generic error message for security
      throw new AppError('Invalid credentials', 401);
    }

    // Step 4.3: Verify password
    // Developer will implement: Compare password with stored hash
    const isPasswordValid = await this.passwordService.compare(
      password,
      user.password_hash
    );

    if (!isPasswordValid) {
      // Generic error message for security
      throw new AppError('Invalid credentials', 401);
    }

    // Step 4.4: Check user status
    if (!user.is_verified) {
      throw new AppError('Please verify your email address', 403);
    }

    if (!user.is_active) {
      throw new AppError('Account is deactivated', 403);
    }

    // Step 4.5: Generate JWT tokens
    // Developer will implement: Generate access and refresh tokens
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role.name
    };

    const token = this.tokenService.generate(tokenPayload, '15m');
    const refreshToken = this.tokenService.generate(
      { userId: user.id },
      '7d'
    );

    // Step 4.6: Create session
    // Developer will implement: Store session in database or Redis
    await this.sessionModel.create({
      userId: user.id,
      token: token,
      refreshToken: refreshToken,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      ipAddress: '', // Will be set from request
      userAgent: '' // Will be set from request
    });

    // Step 4.7: Return authentication result
    return {
      token,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role.name
      },
      expiresIn: 15 * 60 // 15 minutes in seconds
    };
  }
}
```

### 3. Password Service (`backend/services/password.service.ts`)

```typescript
// Step 1: Import required dependencies
import * as bcrypt from 'bcryptjs';
import { SALT_ROUNDS } from '../config/constants';

// Step 2: Create service class
export class PasswordService {
  // Step 3: Implement password comparison
  /**
   * Compare plain password with hashed password
   * @param plainPassword - Plain text password
   * @param hashedPassword - Bcrypt hashed password
   * @returns True if passwords match, false otherwise
   */
  async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
    // Developer will implement: Use bcrypt.compare for constant-time comparison
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Step 4: Implement password hashing (for registration)
  /**
   * Hash password using bcrypt
   * @param password - Plain text password
   * @returns Hashed password
   */
  async hash(password: string): Promise<string> {
    // Developer will implement: Hash password with bcrypt
    return await bcrypt.hash(password, SALT_ROUNDS);
  }
}
```

### 4. Token Service (`backend/services/token.service.ts`)

```typescript
// Step 1: Import required dependencies
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/environment';

// Step 2: Create service class
export class TokenService {
  // Step 3: Implement token generation
  /**
   * Generate JWT token
   * @param payload - Token payload data
   * @param expiresIn - Token expiration time (e.g., '15m', '7d')
   * @returns JWT token string
   */
  generate(payload: any, expiresIn: string): string {
    // Developer will implement: Generate JWT token
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: expiresIn,
      issuer: 'online-examination-system',
      audience: 'online-examination-system'
    });
  }

  // Step 4: Implement token verification
  /**
   * Verify JWT token
   * @param token - JWT token string
   * @returns Decoded token payload
   * @throws Error if token is invalid
   */
  verify(token: string): any {
    // Developer will implement: Verify and decode JWT token
    return jwt.verify(token, JWT_SECRET);
  }
}
```

### 5. Auth Routes (`backend/routes/auth.routes.ts`)

```typescript
// Step 1: Import required dependencies
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateLogin } from '../validators/auth.validator';
import { rateLimiter } from '../middleware/rate-limiter.middleware';

// Step 2: Create router instance
const router = Router();

// Step 3: Initialize controller (dependency injection)
const authController = new AuthController(
  // Developer will inject: AuthService, TokenService instances
);

// Step 4: Define login route
// POST /api/auth/login
router.post(
  '/login',
  rateLimiter({ maxAttempts: 5, windowMs: 15 * 60 * 1000 }), // 5 attempts per 15 minutes
  validateLogin, // Validation middleware
  authController.login.bind(authController) // Bind to maintain 'this' context
);

// Step 5: Export router
export default router;
```

### 6. Auth Validator (`backend/validators/auth.validator.ts`)

```typescript
// Step 1: Import required dependencies
import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Step 2: Define validation rules
export const validateLogin = [
  // Step 2.1: Validate email
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .trim(),

  // Step 2.2: Validate password
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),

  // Step 2.3: Handle validation errors
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    next();
  }
];
```

## Frontend Implementation

### 1. Login Component (`frontend/components/login/login.component.ts`)

```typescript
// Step 1: Import required dependencies
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// Step 2: Create component class
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Step 3: Define component properties
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  // Step 4: Inject dependencies
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  // Step 5: Initialize form
  ngOnInit(): void {
    // Developer will implement: Create reactive form with validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // Step 6: Implement form submission
  onSubmit(): void {
    // Step 6.1: Check if form is valid
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    // Step 6.2: Set loading state
    this.isLoading = true;
    this.errorMessage = '';

    // Step 6.3: Extract form values
    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    // Step 6.4: Call authentication service
    this.authService.login(credentials).subscribe({
      next: (response) => {
        // Step 6.5: Handle success
        // Developer will implement: Store token, navigate based on role
        this.isLoading = false;
        this.router.navigate([this.getRedirectPath(response.user.role)]);
      },
      error: (error) => {
        // Step 6.6: Handle error
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Login failed. Please try again.';
      }
    });
  }

  // Step 7: Helper method for form validation
  private markFormGroupTouched(formGroup: FormGroup): void {
    // Developer will implement: Mark all form controls as touched
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key)?.markAsTouched();
    });
  }

  // Step 8: Helper method for role-based redirection
  private getRedirectPath(role: string): string {
    // Developer will implement: Return dashboard path based on role
    const roleMap: { [key: string]: string } = {
      'admin': '/admin/dashboard',
      'examiner': '/examiner/dashboard',
      'student': '/student/dashboard'
    };
    return roleMap[role] || '/dashboard';
  }
}
```

### 2. Auth Service (`frontend/services/auth.service.ts`)

```typescript
// Step 1: Import required dependencies
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';

// Step 2: Create service class
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Step 3: Define API endpoint
  private apiUrl = '/api/auth';

  // Step 4: Create behavior subject for auth state
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Step 5: Inject dependencies
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  // Step 6: Implement login method
  /**
   * Login user with email and password
   * @param credentials - User credentials
   * @returns Observable with authentication response
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    // Developer will implement: Make HTTP POST request
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Step 6.1: Store token
        this.tokenService.setToken(response.token);
        this.tokenService.setRefreshToken(response.refreshToken);

        // Step 6.2: Store user data
        this.currentUserSubject.next(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  // Step 7: Implement logout method
  logout(): void {
    // Developer will implement: Clear tokens and user data
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    this.currentUserSubject.next(null);
    localStorage.removeItem('user');
  }

  // Step 8: Check authentication status
  isAuthenticated(): boolean {
    // Developer will implement: Check if token exists and is valid
    return this.tokenService.getToken() !== null && !this.tokenService.isTokenExpired();
  }
}
```

## Database Models

### User Model (`backend/models/user.model.ts`)

```typescript
// Step 1: Import required dependencies
import { Schema, model, Document } from 'mongoose'; // or Sequelize for PostgreSQL

// Step 2: Define User interface
interface IUser extends Document {
  email: string;
  password_hash: string;
  name: string;
  role_id: string;
  is_verified: boolean;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

// Step 3: Create User schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true, // Index for fast lookup
    lowercase: true,
    trim: true
  },
  password_hash: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  role_id: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    required: true
  },
  is_verified: {
    type: Boolean,
    default: false
  },
  is_active: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Step 4: Add methods
userSchema.methods.findByEmail = async function(email: string) {
  // Developer will implement: Query user by email
  return await this.findOne({ email: email.toLowerCase() }).populate('role_id');
};

// Step 5: Export model
export const UserModel = model<IUser>('User', userSchema);
```

## Notes for Developer

1. **Replace all comments** with actual implementation code
2. **Configure environment variables** for JWT_SECRET, database connection
3. **Implement error handling** based on error types
4. **Add logging** for security audit trail
5. **Write unit tests** for all service methods
6. **Configure CORS** properly for frontend-backend communication
7. **Use HTTPS** in production for secure token transmission
8. **Implement token refresh** mechanism for better UX

