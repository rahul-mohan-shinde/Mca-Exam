# Authentication Module

## Overview

The Authentication Module is the core security component of the Online Examination System. It handles user authentication, authorization, session management, and role-based access control (RBAC). This module implements industry-standard security practices including JWT token-based authentication, password hashing, and secure session management.

## Architecture

### 3-Tier Architecture Implementation

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (Angular Frontend Components)          │
│  - Login Component                      │
│  - Register Component                    │
│  - Password Reset Component             │
└─────────────────────────────────────────┘
                    ↕
┌─────────────────────────────────────────┐
│         Business Logic Layer            │
│  (Express.js Controllers & Services)    │
│  - AuthController                       │
│  - AuthService                          │
│  - TokenService                         │
│  - PasswordService                      │
└─────────────────────────────────────────┘
                    ↕
┌─────────────────────────────────────────┐
│         Data Access Layer               │
│  (Database Models & Repositories)       │
│  - User Model                           │
│  - Role Model                           │
│  - Session Model                        │
└─────────────────────────────────────────┘
```

## Module Components

### 1. Login Feature
- User credential validation
- JWT token generation
- Session creation
- Role-based redirection

### 2. Registration Feature
- User account creation
- Email verification
- Password strength validation
- Role assignment

### 3. Forgot Password Feature
- Password reset token generation
- Email-based reset link
- Secure password update

### 4. Role-Based Access Control
- Permission management
- Route protection
- Middleware implementation

## Security Principles

1. **Password Hashing**: Bcrypt with salt rounds (10+)
2. **JWT Tokens**: Secure token generation with expiration
3. **Session Management**: Redis-based session storage
4. **Rate Limiting**: Prevent brute force attacks
5. **Input Validation**: Sanitization and validation
6. **CORS Configuration**: Secure cross-origin requests

## Database Schema

### Users Table
- id (Primary Key)
- email (Unique, Indexed)
- password_hash
- role_id (Foreign Key)
- is_verified
- created_at
- updated_at

### Roles Table
- id (Primary Key)
- role_name (Unique)
- permissions (JSON)
- created_at

### Sessions Table
- id (Primary Key)
- user_id (Foreign Key)
- token
- expires_at
- created_at

## Dependencies

- **Backend**: express, jsonwebtoken, bcryptjs, express-validator
- **Frontend**: @angular/core, @angular/router, @angular/forms
- **Database**: mongoose (MongoDB) or sequelize (PostgreSQL)

## API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify-token` - Verify JWT token
- `GET /api/auth/roles` - Get user roles

## Development Guidelines

1. Always validate input before processing
2. Use environment variables for sensitive data
3. Implement proper error handling
4. Log authentication attempts
5. Follow RESTful API conventions
6. Write unit tests for all services

## Testing Strategy

- Unit Tests: Service functions, utility functions
- Integration Tests: API endpoints, database operations
- E2E Tests: Complete authentication flows

