# Forgot Password Feature

## Overview

The Forgot Password feature allows users to reset their passwords when they forget them. It uses secure token-based password reset with email verification.

## Feature Description

### Purpose
- Request password reset via email
- Generate secure reset tokens
- Validate reset tokens
- Update user passwords securely

### User Flow
1. User clicks "Forgot Password"
2. User enters email address
3. System sends reset link to email
4. User clicks link in email
5. User enters new password
6. System validates token and updates password

## Technical Specifications

### Backend Endpoints

**Request Reset**: `POST /api/auth/forgot-password`
```json
{ "email": "user@example.com" }
```

**Reset Password**: `POST /api/auth/reset-password`
```json
{
  "token": "reset-token",
  "password": "NewPass123!",
  "confirmPassword": "NewPass123!"
}
```

## Algorithm

```
ALGORITHM: PasswordReset
1. User requests reset with email
2. Generate secure reset token (32 bytes)
3. Hash token and store with expiration (1 hour)
4. Send email with reset link
5. User clicks link, enters new password
6. Validate token and expiration
7. Hash new password
8. Update user password
9. Invalidate all existing sessions
END
```

**Time Complexity**: O(2^10) - Bcrypt hashing
**Security**: Token expires in 1 hour, single-use tokens

