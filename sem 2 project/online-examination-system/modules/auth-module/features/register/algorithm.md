# Algorithm: User Registration

## Algorithm Name
**User Registration Algorithm (URA)**

## Problem Statement
Create a new user account with validated input, hashed password, and email verification requirement.

## Input
- `name`: String (user full name)
- `email`: String (user email address)
- `password`: String (plain text password)
- `confirmPassword`: String (password confirmation)

## Output
- `userId`: String (created user ID)
- `error`: Error message (if registration fails)

## Algorithm Steps

```
ALGORITHM: UserRegistration
INPUT: name, email, password, confirmPassword
OUTPUT: { userId } OR error

BEGIN
    // Step 1: Input Validation
    IF name length < 2 OR name length > 50 THEN
        RETURN error("Name must be 2-50 characters")
    END IF
    
    IF email format is invalid THEN
        RETURN error("Invalid email format")
    END IF
    
    IF password != confirmPassword THEN
        RETURN error("Passwords do not match")
    END IF
    
    // Step 2: Password Strength Validation
    IF password length < 8 THEN
        RETURN error("Password must be at least 8 characters")
    END IF
    
    IF password does NOT contain uppercase THEN
        RETURN error("Password must contain uppercase letter")
    END IF
    
    IF password does NOT contain lowercase THEN
        RETURN error("Password must contain lowercase letter")
    END IF
    
    IF password does NOT contain number THEN
        RETURN error("Password must contain number")
    END IF
    
    IF password does NOT contain special character THEN
        RETURN error("Password must contain special character")
    END IF
    
    // Step 3: Check Email Uniqueness
    existingUser = FIND user WHERE email = email
    IF existingUser is NOT NULL THEN
        RETURN error("Email already registered")
    END IF
    
    // Step 4: Hash Password
    salt = GENERATE random salt (16 bytes)
    passwordHash = BCRYPT_HASH(password, salt, cost_factor=10)
    
    // Step 5: Generate Verification Token
    verificationToken = GENERATE random token (32 bytes)
    tokenHash = HASH(verificationToken) // Store hash, not plain token
    tokenExpires = current_timestamp + 24 hours
    
    // Step 6: Assign Default Role
    defaultRole = FIND role WHERE name = "student"
    
    // Step 7: Create User Record
    user = CREATE user record {
        name: name,
        email: email.toLowerCase(),
        password_hash: passwordHash,
        role_id: defaultRole.id,
        is_verified: false,
        verification_token: tokenHash,
        verification_token_expires: tokenExpires,
        is_active: true,
        created_at: current_timestamp
    }
    
    // Step 8: Send Verification Email (Async)
    SEND email to user.email with verification link
    // Don't block response if email fails
    
    // Step 9: Log Registration
    LOG registration event (userId, email, timestamp)
    
    // Step 10: Return Success
    RETURN {
        success: true,
        userId: user.id,
        message: "Registration successful. Please verify your email."
    }
END
```

## Complexity Analysis

**Time Complexity**: O(2^10) - Dominated by bcrypt hashing
**Space Complexity**: O(1) - Constant space

## Security Considerations

1. **Password Hashing**: Bcrypt with salt prevents rainbow table attacks
2. **Email Verification**: Prevents fake email registrations
3. **Token Security**: Store hashed verification token, not plain text
4. **Input Sanitization**: Prevents XSS and injection attacks
5. **Rate Limiting**: Prevents mass account creation

