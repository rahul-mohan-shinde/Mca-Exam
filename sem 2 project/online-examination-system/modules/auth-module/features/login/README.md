# Login Feature

## Overview

The Login feature is the primary authentication mechanism for the Online Examination System. It allows users to securely authenticate using their email and password, receiving a JWT token for subsequent API requests.

## Feature Description

### Purpose
- Authenticate users with email and password
- Generate secure JWT tokens
- Establish user sessions
- Redirect users based on their roles

### User Flow
1. User navigates to login page
2. User enters email and password
3. System validates credentials
4. System generates JWT token
5. User is redirected to appropriate dashboard

## Technical Specifications

### Backend Endpoint
- **URL**: `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "SecurePass123!"
  }
  ```
- **Response (Success - 200)**:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "123",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "student"
    },
    "expiresIn": 900
  }
  ```
- **Response (Error - 401)**:
  ```json
  {
    "success": false,
    "message": "Invalid credentials"
  }
  ```

### Frontend Component
- **Component**: `LoginComponent`
- **Route**: `/login`
- **Form Fields**: email, password
- **Validations**: Email format, password required

## Security Features

1. **Rate Limiting**: Maximum 5 attempts per 15 minutes
2. **Password Hashing**: Bcrypt with salt
3. **Token Expiration**: 15 minutes (access), 7 days (refresh)
4. **HTTPS Only**: Tokens only sent over HTTPS
5. **Generic Error Messages**: Prevents user enumeration

## Dependencies

- `auth.service.ts` - Authentication service
- `token.service.ts` - JWT token management
- `password.service.ts` - Password hashing/verification
- `user.model.ts` - User database model

