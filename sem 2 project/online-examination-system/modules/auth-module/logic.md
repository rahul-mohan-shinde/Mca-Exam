# Logic Documentation: Authentication Module

## Core Logic Flows

### 1. User Login Logic

```
START
  │
  ├─> RECEIVE login request (email, password)
  │
  ├─> VALIDATE input
  │   ├─> Check email format (regex)
  │   ├─> Check password not empty
  │   └─> IF invalid → RETURN 400 Bad Request
  │
  ├─> CHECK rate limit
  │   └─> IF exceeded → RETURN 429 Too Many Requests
  │
  ├─> QUERY database for user by email
  │   └─> IF not found → RETURN 401 Unauthorized (generic message)
  │
  ├─> COMPARE password
  │   ├─> Hash input password with stored salt
  │   ├─> Compare with stored hash
  │   └─> IF mismatch → RETURN 401 Unauthorized
  │
  ├─> CHECK user status
  │   ├─> IF not verified → RETURN 403 Forbidden
  │   └─> IF inactive → RETURN 403 Forbidden
  │
  ├─> GENERATE JWT token
  │   ├─> Payload: { userId, email, role, iat, exp }
  │   ├─> Sign with secret key
  │   └─> Set expiration (15 minutes for access, 7 days for refresh)
  │
  ├─> CREATE session record
  │   ├─> Store token in Redis (optional)
  │   └─> Set expiration time
  │
  ├─> LOG successful login
  │
  └─> RETURN 200 OK { token, user, expiresIn }
END
```

**Error Handling:**
- All errors return generic messages (security)
- Detailed errors logged server-side
- Rate limiting prevents brute force

### 2. User Registration Logic

```
START
  │
  ├─> RECEIVE registration request (email, password, name, role)
  │
  ├─> VALIDATE input
  │   ├─> Email format validation
  │   ├─> Password strength validation
  │   │   ├─> Minimum 8 characters
  │   │   ├─> At least one uppercase
  │   │   ├─> At least one lowercase
  │   │   ├─> At least one number
  │   │   └─> At least one special character
  │   ├─> Name validation (2-50 characters)
  │   └─> IF invalid → RETURN 400 Bad Request
  │
  ├─> CHECK if email exists
  │   └─> IF exists → RETURN 409 Conflict
  │
  ├─> HASH password
  │   ├─> Generate salt (16 bytes)
  │   ├─> Apply bcrypt (10 rounds)
  │   └─> Store hash + salt
  │
  ├─> ASSIGN default role
  │   └─> Default: "student" (unless admin creates)
  │
  ├─> CREATE user record
  │   ├─> email, password_hash, name, role_id
  │   ├─> is_verified: false
  │   └─> verification_token: generate()
  │
  ├─> SEND verification email
  │   └─> Async operation (don't block response)
  │
  ├─> LOG registration
  │
  └─> RETURN 201 Created { message, userId }
END
```

### 3. Password Reset Logic

```
START
  │
  ├─> RECEIVE forgot-password request (email)
  │
  ├─> VALIDATE email format
  │   └─> IF invalid → RETURN 400 Bad Request
  │
  ├─> FIND user by email
  │   └─> IF not found → RETURN 200 OK (generic message for security)
  │
  ├─> GENERATE reset token
  │   ├─> Random 32-byte token
  │   ├─> Hash token (store hash in DB)
  │   └─> Set expiration (1 hour)
  │
  ├─> STORE reset token
  │   ├─> user.reset_token = hashed_token
  │   └─> user.reset_token_expires = now + 1 hour
  │
  ├─> SEND reset email
  │   ├─> Include reset link with token
  │   └─> Async operation
  │
  └─> RETURN 200 OK { message: "If email exists, reset link sent" }
END

RESET PASSWORD FLOW:
START
  │
  ├─> RECEIVE reset-password request (token, newPassword)
  │
  ├─> VALIDATE token format
  │   └─> IF invalid → RETURN 400 Bad Request
  │
  ├─> FIND user by reset token
  │   ├─> Hash provided token
  │   ├─> Compare with stored hash
  │   └─> IF not found → RETURN 400 Bad Request
  │
  ├─> CHECK token expiration
  │   └─> IF expired → RETURN 400 Bad Request
  │
  ├─> VALIDATE new password strength
  │   └─> IF invalid → RETURN 400 Bad Request
  │
  ├─> HASH new password
  │
  ├─> UPDATE user password
  │   ├─> password_hash = new_hash
  │   ├─> reset_token = null
  │   └─> reset_token_expires = null
  │
  ├─> INVALIDATE all existing sessions
  │   └─> Force re-login
  │
  └─> RETURN 200 OK { message: "Password reset successful" }
END
```

### 4. Token Verification Logic

```
START
  │
  ├─> EXTRACT token from request header
  │   └─> Authorization: Bearer <token>
  │
  ├─> IF token missing → RETURN 401 Unauthorized
  │
  ├─> VERIFY token signature
  │   ├─> Decode token
  │   ├─> Verify signature with secret
  │   └─> IF invalid → RETURN 401 Unauthorized
  │
  ├─> CHECK token expiration
  │   └─> IF expired → RETURN 401 Unauthorized
  │
  ├─> CHECK token in blacklist (if logout)
  │   └─> IF blacklisted → RETURN 401 Unauthorized
  │
  ├─> EXTRACT user data from token
  │   ├─> userId, email, role
  │   └─> Verify user still exists
  │
  ├─> ATTACH user to request object
  │   └─> req.user = { userId, email, role }
  │
  └─> CONTINUE to next middleware/route
END
```

### 5. Role-Based Access Control Logic

```
START
  │
  ├─> RECEIVE request with required role/permission
  │
  ├─> EXTRACT user from request (from auth middleware)
  │   └─> IF no user → RETURN 401 Unauthorized
  │
  ├─> FETCH user role and permissions
  │   └─> Query role table for permissions
  │
  ├─> CHECK permission matrix
  │   ├─> Role hierarchy: Super Admin > Admin > Examiner > Student
  │   ├─> Permission check: role.permissions.includes(required)
  │   └─> IF insufficient → RETURN 403 Forbidden
  │
  └─> ALLOW access → Continue to route handler
END
```

## Algorithm Complexity Analysis

### Login Algorithm
- **Time Complexity**: O(1) - Database lookup is indexed by email
- **Space Complexity**: O(1) - Constant space for token generation
- **Bcrypt Hashing**: O(2^10) = O(1024) - Exponential with cost factor

### Registration Algorithm
- **Time Complexity**: O(1) - Single database insert
- **Space Complexity**: O(1) - Constant space
- **Password Hashing**: O(2^10) - Bcrypt cost factor

### Token Verification
- **Time Complexity**: O(1) - JWT verification is constant time
- **Space Complexity**: O(1) - Token decoding is constant space

## Security Considerations

1. **Password Storage**: Never store plain passwords
2. **Token Security**: Use HTTPS, short expiration times
3. **Rate Limiting**: Prevent brute force attacks
4. **Input Validation**: Sanitize all inputs
5. **Error Messages**: Generic messages to prevent enumeration
6. **Session Management**: Secure session storage
7. **CORS**: Configure allowed origins
8. **CSRF Protection**: Use tokens for state-changing operations

## Database Transaction Logic

### Registration Transaction
```
BEGIN TRANSACTION
  1. INSERT user
  2. INSERT user_role mapping
  3. SEND verification email (async)
COMMIT TRANSACTION
```

### Password Reset Transaction
```
BEGIN TRANSACTION
  1. UPDATE user (reset_token, reset_token_expires)
  2. SEND email (async)
COMMIT TRANSACTION
```

