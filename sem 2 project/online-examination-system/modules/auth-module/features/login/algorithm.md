# Algorithm: User Login

## Algorithm Name
**User Authentication Algorithm (UAA)**

## Problem Statement
Given user credentials (email and password), authenticate the user and generate a secure session token if credentials are valid.

## Input
- `email`: String (user email address)
- `password`: String (plain text password)

## Output
- `token`: JWT token string (if authentication successful)
- `user`: User object (if authentication successful)
- `error`: Error message (if authentication failed)

## Algorithm Steps

```
ALGORITHM: UserAuthentication
INPUT: email, password
OUTPUT: { token, user } OR error

BEGIN
    // Step 1: Input Validation
    IF email format is invalid THEN
        RETURN error("Invalid email format")
    END IF
    
    IF password is empty THEN
        RETURN error("Password required")
    END IF
    
    // Step 2: Rate Limiting Check
    attempts = GET login attempts for IP address
    IF attempts >= MAX_ATTEMPTS (5) THEN
        RETURN error("Too many attempts. Try again later.")
    END IF
    INCREMENT attempts counter
    
    // Step 3: Database Lookup
    user = FIND user WHERE email = email
    IF user is NULL THEN
        RETURN error("Invalid credentials") // Generic message
    END IF
    
    // Step 4: Password Verification
    passwordHash = user.password_hash
    salt = EXTRACT salt from passwordHash
    hashedInput = HASH(password, salt) using bcrypt
    
    IF hashedInput != passwordHash THEN
        RETURN error("Invalid credentials") // Generic message
    END IF
    
    // Step 5: User Status Check
    IF user.is_verified == false THEN
        RETURN error("Please verify your email")
    END IF
    
    IF user.is_active == false THEN
        RETURN error("Account is deactivated")
    END IF
    
    // Step 6: Token Generation
    payload = {
        userId: user.id,
        email: user.email,
        role: user.role.name,
        iat: current_timestamp,
        exp: current_timestamp + TOKEN_EXPIRY (15 minutes)
    }
    
    token = GENERATE_JWT(payload, SECRET_KEY)
    refreshToken = GENERATE_JWT({ userId: user.id }, SECRET_KEY, 7 days)
    
    // Step 7: Session Creation
    session = {
        userId: user.id,
        token: token,
        refreshToken: refreshToken,
        expiresAt: current_timestamp + TOKEN_EXPIRY,
        ipAddress: request.ip,
        userAgent: request.userAgent
    }
    CREATE session in database OR Redis
    
    // Step 8: Logging
    LOG successful login attempt (userId, ipAddress, timestamp)
    RESET rate limit counter for IP
    
    // Step 9: Return Success
    RETURN {
        success: true,
        token: token,
        refreshToken: refreshToken,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role.name
        },
        expiresIn: TOKEN_EXPIRY
    }
END
```

## Complexity Analysis

### Time Complexity
- **Input Validation**: O(1) - Constant time regex check
- **Rate Limiting**: O(1) - Redis lookup is O(1)
- **Database Lookup**: O(1) - Indexed email lookup
- **Password Hashing**: O(2^cost_factor) - Bcrypt is exponential
  - With cost factor 10: O(2^10) = O(1024)
- **Token Generation**: O(1) - JWT signing is constant
- **Session Creation**: O(1) - Database insert is O(1)

**Overall Time Complexity**: O(2^cost_factor) ≈ O(1024) ≈ O(1) for practical purposes

### Space Complexity
- **Input Storage**: O(1) - Constant space for email/password
- **User Object**: O(1) - Fixed size user object
- **Token Storage**: O(1) - Fixed size JWT token
- **Session Storage**: O(1) - Fixed size session object

**Overall Space Complexity**: O(1) - Constant space

## Security Considerations

### 1. Password Comparison
```
ALGORITHM: SecurePasswordCompare
INPUT: plainPassword, storedHash
OUTPUT: boolean

BEGIN
    // Use constant-time comparison to prevent timing attacks
    extractedSalt = EXTRACT salt from storedHash
    computedHash = BCRYPT_HASH(plainPassword, extractedSalt)
    
    // Constant-time string comparison
    result = CONSTANT_TIME_COMPARE(computedHash, storedHash)
    RETURN result
END
```

**Time Complexity**: O(2^cost_factor) - Bcrypt hashing
**Security**: Prevents timing attacks

### 2. Rate Limiting Algorithm
```
ALGORITHM: RateLimitCheck
INPUT: ipAddress
OUTPUT: boolean (allowed or not)

BEGIN
    key = "login_attempts:" + ipAddress
    attempts = GET key from Redis
    
    IF attempts is NULL THEN
        SET key = 1 with expiry 15 minutes
        RETURN true
    END IF
    
    IF attempts >= MAX_ATTEMPTS (5) THEN
        RETURN false
    END IF
    
    INCREMENT key
    RETURN true
END
```

**Time Complexity**: O(1) - Redis operations
**Space Complexity**: O(n) - n is number of unique IPs

### 3. Token Generation Algorithm
```
ALGORITHM: GenerateJWT
INPUT: payload, secretKey, expirationTime
OUTPUT: JWT token string

BEGIN
    header = {
        alg: "HS256",
        typ: "JWT"
    }
    
    payload.exp = current_timestamp + expirationTime
    payload.iat = current_timestamp
    
    encodedHeader = BASE64URL_ENCODE(header)
    encodedPayload = BASE64URL_ENCODE(payload)
    
    signature = HMAC_SHA256(
        encodedHeader + "." + encodedPayload,
        secretKey
    )
    encodedSignature = BASE64URL_ENCODE(signature)
    
    token = encodedHeader + "." + encodedPayload + "." + encodedSignature
    RETURN token
END
```

**Time Complexity**: O(1) - Constant time encoding
**Security**: HMAC-SHA256 is cryptographically secure

## Error Handling Algorithm

```
ALGORITHM: HandleLoginError
INPUT: error, errorType
OUTPUT: HTTP response

BEGIN
    SWITCH errorType:
        CASE "VALIDATION_ERROR":
            RETURN 400 Bad Request with error message
        
        CASE "RATE_LIMIT_EXCEEDED":
            RETURN 429 Too Many Requests
            RETURN message: "Too many attempts. Try again in 15 minutes."
        
        CASE "USER_NOT_FOUND":
        CASE "INVALID_PASSWORD":
            // Generic message for security
            RETURN 401 Unauthorized
            RETURN message: "Invalid credentials"
        
        CASE "USER_NOT_VERIFIED":
            RETURN 403 Forbidden
            RETURN message: "Please verify your email"
        
        CASE "ACCOUNT_DEACTIVATED":
            RETURN 403 Forbidden
            RETURN message: "Account is deactivated"
        
        CASE "DATABASE_ERROR":
            LOG error details (server-side only)
            RETURN 500 Internal Server Error
            RETURN message: "Internal server error"
        
        DEFAULT:
            LOG error details
            RETURN 500 Internal Server Error
    END SWITCH
END
```

## Optimization Strategies

1. **Database Indexing**: Email field indexed for O(1) lookup
2. **Caching**: Cache user roles to reduce database queries
3. **Connection Pooling**: Reuse database connections
4. **Async Operations**: Non-blocking I/O for database operations
5. **Token Refresh**: Use refresh tokens to reduce re-authentication

## Testing Scenarios

1. **Valid Credentials**: Should return token and user data
2. **Invalid Email**: Should return validation error
3. **Invalid Password**: Should return generic error
4. **Non-existent User**: Should return generic error
5. **Unverified User**: Should return verification error
6. **Rate Limit**: Should block after 5 attempts
7. **Database Failure**: Should return 500 error
8. **Concurrent Logins**: Should handle multiple requests

