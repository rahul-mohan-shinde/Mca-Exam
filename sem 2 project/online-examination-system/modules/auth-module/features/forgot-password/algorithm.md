# Algorithm: Password Reset

## Algorithm Name
**Password Reset Algorithm (PRA)**

## Steps

```
ALGORITHM: PasswordReset
1. VALIDATE email format
2. FIND user by email (if exists)
3. GENERATE secure random token (32 bytes)
4. HASH token and store with expiration
5. SEND email with reset link
6. USER clicks link and enters new password
7. VALIDATE token and expiration
8. HASH new password
9. UPDATE user password
10. INVALIDATE all sessions
END
```

**Time Complexity**: O(2^10) - Bcrypt
**Security**: 1-hour expiration, single-use tokens

