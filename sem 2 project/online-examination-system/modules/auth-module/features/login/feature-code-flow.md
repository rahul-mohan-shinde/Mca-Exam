# Feature Code Flow: Login

## Complete Code Execution Flow

```
┌─────────────────────────────────────────────────────────┐
│                    USER ACTION                          │
│  User enters email/password and clicks "Login"         │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────┐
│              FRONTEND: LoginComponent                   │
│  login.component.ts                                     │
│  ┌─────────────────────────────────────┐               │
│  │ onSubmit() {                        │               │
│  │   1. Validate form                  │               │
│  │   2. Call authService.login()       │               │
│  │   3. Handle response                │               │
│  │   4. Navigate to dashboard          │               │
│  │ }                                   │               │
│  └─────────────────────────────────────┘               │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────┐
│           FRONTEND: AuthService                         │
│  auth.service.ts                                        │
│  ┌─────────────────────────────────────┐               │
│  │ login(credentials) {                │               │
│  │   1. Prepare HTTP request           │               │
│  │   2. POST /api/auth/login           │               │
│  │   3. Handle response                │               │
│  │   4. Store token in localStorage    │               │
│  │   5. Return Observable              │               │
│  │ }                                   │               │
│  └─────────────────────────────────────┘               │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ↓ HTTP POST Request
                       │
┌─────────────────────────────────────────────────────────┐
│              BACKEND: Auth Routes                      │
│  auth.routes.ts                                         │
│  ┌─────────────────────────────────────┐               │
│  │ router.post('/login', ...)          │               │
│  │   1. Rate Limiter Middleware        │               │
│  │   2. Validation Middleware          │               │
│  │   3. Auth Controller                │               │
│  └─────────────────────────────────────┘               │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────┐
│         BACKEND: Rate Limiter Middleware               │
│  rate-limiter.middleware.ts                             │
│  ┌─────────────────────────────────────┐               │
│  │ checkRateLimit() {                   │               │
│  │   1. Check IP address                │               │
│  │   2. Count attempts (Redis)          │               │
│  │   3. If > 5 attempts → 429 Error     │               │
│  │   4. Else → Continue                 │               │
│  │ }                                   │               │
│  └─────────────────────────────────────┘               │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────┐
│         BACKEND: Validation Middleware                 │
│  auth.validator.ts                                      │
│  ┌─────────────────────────────────────┐               │
│  │ validateLogin() {                   │               │
│  │   1. Check email format              │               │
│  │   2. Check password not empty        │               │
│  │   3. Sanitize inputs                 │               │
│  │   4. If invalid → 400 Error          │               │
│  │   5. Else → Continue                 │               │
│  │ }                                   │               │
│  └─────────────────────────────────────┘               │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────┐
│            BACKEND: Auth Controller                    │
│  auth.controller.ts                                     │
│  ┌─────────────────────────────────────┐               │
│  │ async login(req, res) {             │               │
│  │   1. Extract email, password        │               │
│  │   2. Call authService.authenticate()│               │
│  │   3. Handle result                  │               │
│  │   4. Return response                │               │
│  │ }                                   │               │
│  └─────────────────────────────────────┘               │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────┐
│            BACKEND: Auth Service                       │
│  auth.service.ts                                        │
│  ┌─────────────────────────────────────┐               │
│  │ async authenticate(email, password) {│               │
│  │   1. Find user by email              │               │
│  │   2. If not found → throw error      │               │
│  │   3. Compare password                │               │
│  │   4. If mismatch → throw error        │               │
│  │   5. Check user status               │               │
│  │   6. Generate JWT token              │               │
│  │   7. Create session                  │               │
│  │   8. Return token + user data        │               │
│  │ }                                   │               │
│  └─────────────────────────────────────┘               │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────┐
│         BACKEND: User Model (Database)                │
│  user.model.ts                                          │
│  ┌─────────────────────────────────────┐               │
│  │ findByEmail(email) {                 │               │
│  │   1. Query database                  │               │
│  │   2. Index lookup (O(1))             │               │
│  │   3. Return user or null             │               │
│  │ }                                   │               │
│  └─────────────────────────────────────┘               │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────┐
│       BACKEND: Password Service                        │
│  password.service.ts                                    │
│  ┌─────────────────────────────────────┐               │
│  │ compare(plain, hashed) {            │               │
│  │   1. Extract salt from hash         │               │
│  │   2. Hash plain password with salt  │               │
│  │   3. Compare hashes                 │               │
│  │   4. Return boolean                 │               │
│  │ }                                   │               │
│  └─────────────────────────────────────┘               │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────┐
│       BACKEND: Token Service                           │
│  token.service.ts                                       │
│  ┌─────────────────────────────────────┐               │
│  │ generate(payload) {                 │               │
│  │   1. Create token payload           │               │
│  │   2. Sign with secret key            │               │
│  │   3. Set expiration                 │               │
│  │   4. Return token                   │               │
│  │ }                                   │               │
│  └─────────────────────────────────────┘               │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────┐
│              HTTP Response                              │
│  { token, user, expiresIn }                            │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────┐
│         FRONTEND: Handle Response                      │
│  login.component.ts                                     │
│  ┌─────────────────────────────────────┐               │
│  │ handleSuccess(response) {           │               │
│  │   1. Store token                    │               │
│  │   2. Store user data                │               │
│  │   3. Navigate based on role         │               │
│  │      - Admin → /admin/dashboard     │               │
│  │      - Student → /student/dashboard │               │
│  │ }                                   │               │
│  └─────────────────────────────────────┘               │
└─────────────────────────────────────────────────────────┘
```

## Error Flow

```
ERROR SCENARIOS:
1. Invalid Email Format
   → Validation Middleware → 400 Bad Request

2. User Not Found
   → Auth Service → Generic 401 Error

3. Wrong Password
   → Password Service → Generic 401 Error

4. Rate Limit Exceeded
   → Rate Limiter → 429 Too Many Requests

5. User Not Verified
   → Auth Service → 403 Forbidden

6. Database Error
   → Catch Block → 500 Internal Server Error
```

## State Management Flow

```
BEFORE LOGIN:
- localStorage: {}
- Auth State: Not Authenticated
- Current User: null

AFTER LOGIN:
- localStorage: { token, refreshToken, user }
- Auth State: Authenticated
- Current User: { id, email, name, role }

REDIRECT LOGIC:
- Admin → /admin/dashboard
- Examiner → /examiner/dashboard
- Student → /student/dashboard
```

