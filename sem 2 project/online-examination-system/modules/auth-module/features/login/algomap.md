# Algorithm Map: Login Feature

## Algorithm Dependency Graph

```
┌─────────────────────────────────────────────────────────┐
│              MAIN ALGORITHM                             │
│         UserAuthentication (UAA)                        │
└──────────────────────┬──────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ↓              ↓              ↓
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   Input      │ │   Rate       │ │   Database   │
│ Validation   │ │   Limiting   │ │   Lookup     │
│ Algorithm    │ │   Algorithm   │ │   Algorithm  │
└──────────────┘ └──────────────┘ └──────┬───────┘
                                          │
                                          ↓
                              ┌───────────────────────┐
                              │   Password           │
                              │   Verification       │
                              │   Algorithm          │
                              └──────────┬───────────┘
                                         │
                    ┌───────────────────┼───────────────────┐
                    │                   │                   │
                    ↓                   ↓                   ↓
          ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
          │   User Status   │ │   Token         │ │   Session       │
          │   Check         │ │   Generation    │ │   Creation      │
          │   Algorithm     │ │   Algorithm     │ │   Algorithm     │
          └─────────────────┘ └─────────────────┘ └─────────────────┘
```

## Algorithm Sequence Diagram

```
User          Frontend        Backend         Database        Redis
 │               │               │               │              │
 │──Login───────>│               │               │              │
 │               │──POST /login─>│               │              │
 │               │               │──Rate Limit──>│              │
 │               │               │<──Allowed─────│              │
 │               │               │               │              │
 │               │               │──Find User───>│              │
 │               │               │<──User Data───│              │
 │               │               │               │              │
 │               │               │──Compare─────>│              │
 │               │               │   Password    │              │
 │               │               │<──Valid───────│              │
 │               │               │               │              │
 │               │               │──Generate────>│              │
 │               │               │   Token       │              │
 │               │               │               │              │
 │               │               │──Store───────>│              │
 │               │               │   Session     │              │
 │               │               │               │              │
 │               │<──Token───────│               │              │
 │<──Success─────│               │               │              │
```

## Sub-Algorithm Details

### 1. Input Validation Algorithm
```
┌─────────────────────────────────┐
│  Input Validation               │
├─────────────────────────────────┤
│  Input: email, password         │
│  Output: valid/invalid          │
│                                 │
│  1. Email Regex Check           │
│  2. Password Length Check       │
│  3. Sanitize Inputs             │
└─────────────────────────────────┘
```

### 2. Rate Limiting Algorithm
```
┌─────────────────────────────────┐
│  Rate Limiting                  │
├─────────────────────────────────┤
│  Input: ipAddress               │
│  Output: allowed/blocked        │
│                                 │
│  1. Check Redis for attempts    │
│  2. If < 5 → Allow              │
│  3. If >= 5 → Block             │
│  4. Increment counter           │
└─────────────────────────────────┘
```

### 3. Database Lookup Algorithm
```
┌─────────────────────────────────┐
│  Database Lookup                │
├─────────────────────────────────┤
│  Input: email                   │
│  Output: user object or null    │
│                                 │
│  1. Query by indexed email      │
│  2. Return user if found        │
│  3. Return null if not found    │
│                                 │
│  Complexity: O(1) - Indexed     │
└─────────────────────────────────┘
```

### 4. Password Verification Algorithm
```
┌─────────────────────────────────┐
│  Password Verification          │
├─────────────────────────────────┤
│  Input: plain, hashed           │
│  Output: match/no match         │
│                                 │
│  1. Extract salt from hash      │
│  2. Hash plain with salt        │
│  3. Compare hashes              │
│  4. Constant-time comparison    │
│                                 │
│  Complexity: O(2^10)            │
└─────────────────────────────────┘
```

### 5. Token Generation Algorithm
```
┌─────────────────────────────────┐
│  Token Generation               │
├─────────────────────────────────┤
│  Input: payload, secret         │
│  Output: JWT token              │
│                                 │
│  1. Create header               │
│  2. Add expiration to payload   │
│  3. Base64URL encode            │
│  4. HMAC-SHA256 signature       │
│  5. Combine header.payload.sig  │
│                                 │
│  Complexity: O(1)               │
└─────────────────────────────────┘
```

## Algorithm Flow Control

### Decision Points

```
START
 │
 ├─> [Email Valid?]
 │   ├─ YES → Continue
 │   └─ NO → Return 400 Error
 │
 ├─> [Rate Limit OK?]
 │   ├─ YES → Continue
 │   └─ NO → Return 429 Error
 │
 ├─> [User Exists?]
 │   ├─ YES → Continue
 │   └─ NO → Return 401 Error (generic)
 │
 ├─> [Password Matches?]
 │   ├─ YES → Continue
 │   └─ NO → Return 401 Error (generic)
 │
 ├─> [User Verified?]
 │   ├─ YES → Continue
 │   └─ NO → Return 403 Error
 │
 ├─> [User Active?]
 │   ├─ YES → Continue
 │   └─ NO → Return 403 Error
 │
 └─> Generate Token → Return Success
```

## Algorithm Performance Map

```
Operation              Complexity    Notes
─────────────────────────────────────────────────
Input Validation       O(1)         Regex check
Rate Limiting          O(1)         Redis lookup
Database Lookup        O(1)         Indexed email
Password Hashing       O(2^10)      Bcrypt cost
Token Generation       O(1)         JWT signing
Session Creation       O(1)         DB insert
─────────────────────────────────────────────────
Total (Sequential)      O(2^10)      Dominated by bcrypt
```

## Algorithm Security Map

```
Security Layer         Algorithm              Protection
─────────────────────────────────────────────────────────
Input Sanitization     Validation Algorithm   XSS, Injection
Rate Limiting          Rate Limit Algorithm   Brute Force
Password Security      Bcrypt Hashing         Rainbow Tables
Token Security         JWT with HMAC          Token Tampering
Session Security       Secure Storage         Session Hijacking
Error Messages         Generic Responses      User Enumeration
```

## Algorithm Integration Points

```
┌─────────────────────────────────────────────────┐
│  External Systems                                │
├─────────────────────────────────────────────────┤
│  Database: User lookup, session storage         │
│  Redis: Rate limiting, session cache            │
│  Email Service: Verification emails (future)    │
│  Logging Service: Audit trail                   │
└─────────────────────────────────────────────────┘
```

## Algorithm Testing Map

```
Test Case              Algorithm Tested          Expected Result
───────────────────────────────────────────────────────────────
Valid Login            UAA (all steps)          Success + Token
Invalid Email          Input Validation         Validation Error
Invalid Password       Password Verification    Generic Error
Rate Limit             Rate Limiting            Blocked Request
Unverified User        User Status Check        Verification Error
Database Error         Database Lookup          500 Error
```

