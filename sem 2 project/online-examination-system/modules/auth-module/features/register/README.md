# Registration Feature

## Overview

The Registration feature allows new users to create accounts in the Online Examination System. It includes email validation, password strength requirements, email verification, and automatic role assignment.

## Feature Description

### Purpose
- Create new user accounts
- Validate user input (email, password, name)
- Send verification emails
- Assign default roles (typically "student")

### User Flow
1. User navigates to registration page
2. User fills registration form (name, email, password, confirm password)
3. System validates input
4. System creates user account
5. System sends verification email
6. User receives confirmation message

## Technical Specifications

### Backend Endpoint
- **URL**: `POST /api/auth/register`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "user@example.com",
    "password": "SecurePass123!",
    "confirmPassword": "SecurePass123!"
  }
  ```
- **Response (Success - 201)**:
  ```json
  {
    "success": true,
    "message": "Registration successful. Please check your email for verification.",
    "userId": "123"
  }
  ```

## Security Features

1. **Password Strength**: Minimum 8 characters, uppercase, lowercase, number, special character
2. **Email Uniqueness**: Prevents duplicate accounts
3. **Email Verification**: Requires email confirmation before account activation
4. **Password Hashing**: Bcrypt with salt
5. **Input Sanitization**: Prevents injection attacks

## Algorithm

```
ALGORITHM: UserRegistration
INPUT: name, email, password, confirmPassword
OUTPUT: { success, userId } OR error

BEGIN
    1. VALIDATE input (name, email format, password strength)
    2. CHECK if email already exists
    3. VERIFY password matches confirmPassword
    4. HASH password with bcrypt
    5. GENERATE verification token
    6. CREATE user record (is_verified: false)
    7. SEND verification email (async)
    8. RETURN success response
END
```

**Time Complexity**: O(1) - Database operations are indexed
**Space Complexity**: O(1) - Constant space

