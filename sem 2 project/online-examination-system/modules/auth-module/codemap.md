# Code Map: Authentication Module

## File Structure

```
auth-module/
│
├── backend/
│   ├── controllers/
│   │   └── auth.controller.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── token.service.ts
│   │   └── password.service.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── role.middleware.ts
│   │   └── rate-limiter.middleware.ts
│   ├── validators/
│   │   └── auth.validator.ts
│   ├── models/
│   │   ├── user.model.ts
│   │   ├── role.model.ts
│   │   └── session.model.ts
│   └── routes/
│       └── auth.routes.ts
│
└── frontend/
    ├── components/
    │   ├── login/
    │   │   ├── login.component.ts
    │   │   ├── login.component.html
    │   │   └── login.component.scss
    │   ├── register/
    │   │   ├── register.component.ts
    │   │   ├── register.component.html
    │   │   └── register.component.scss
    │   └── forgot-password/
    │       ├── forgot-password.component.ts
    │       ├── forgot-password.component.html
    │       └── forgot-password.component.scss
    ├── services/
    │   ├── auth.service.ts
    │   └── token.service.ts
    ├── guards/
    │   ├── auth.guard.ts
    │   └── role.guard.ts
    └── interceptors/
        └── auth.interceptor.ts
```

## Code Dependencies Map

```
┌─────────────────────────────────────────┐
│         Frontend Components             │
│  (login, register, forgot-password)    │
└──────────────┬──────────────────────────┘
               │ uses
               ↓
┌─────────────────────────────────────────┐
│         Frontend Services               │
│  (auth.service, token.service)          │
└──────────────┬──────────────────────────┘
               │ HTTP calls
               ↓
┌─────────────────────────────────────────┐
│         Backend Routes                  │
│  (auth.routes.ts)                       │
└──────────────┬──────────────────────────┘
               │ uses middleware
               ↓
┌─────────────────────────────────────────┐
│         Controllers                     │
│  (auth.controller.ts)                  │
└──────────────┬──────────────────────────┘
               │ calls
               ↓
┌─────────────────────────────────────────┐
│         Services                        │
│  (auth.service, token.service,          │
│   password.service)                     │
└──────────────┬──────────────────────────┘
               │ queries
               ↓
┌─────────────────────────────────────────┐
│         Models                          │
│  (user.model, role.model,               │
│   session.model)                        │
└─────────────────────────────────────────┘
```

## Function Call Flow

### Login Flow

```
login.component.ts
  └─> auth.service.login()
       └─> HTTP POST /api/auth/login
            └─> auth.routes.ts
                 └─> rate-limiter.middleware
                      └─> auth.validator
                           └─> auth.controller.login()
                                └─> auth.service.authenticate()
                                     └─> user.model.findByEmail()
                                     └─> password.service.compare()
                                     └─> token.service.generate()
                                          └─> session.model.create()
```

### Registration Flow

```
register.component.ts
  └─> auth.service.register()
       └─> HTTP POST /api/auth/register
            └─> auth.routes.ts
                 └─> auth.validator
                      └─> auth.controller.register()
                           └─> auth.service.createUser()
                                └─> password.service.hash()
                                └─> user.model.create()
                                └─> token.service.generate()
```

### Protected Route Flow

```
Component (requires auth)
  └─> auth.guard.canActivate()
       └─> token.service.isValid()
            └─> HTTP GET /api/auth/verify-token
                 └─> auth.middleware.verify()
                      └─> token.service.verify()
                           └─> role.middleware.check()
                                └─> Allow/Deny access
```

## Key Functions Reference

### Backend Functions

1. **auth.controller.ts**
   - `login(req, res)` - Handle login request
   - `register(req, res)` - Handle registration
   - `forgotPassword(req, res)` - Handle password reset request
   - `resetPassword(req, res)` - Handle password reset
   - `logout(req, res)` - Handle logout
   - `verifyToken(req, res)` - Verify JWT token

2. **auth.service.ts**
   - `authenticate(email, password)` - Authenticate user
   - `createUser(userData)` - Create new user
   - `generateResetToken(email)` - Generate reset token
   - `updatePassword(userId, newPassword)` - Update password

3. **token.service.ts**
   - `generate(payload)` - Generate JWT token
   - `verify(token)` - Verify JWT token
   - `decode(token)` - Decode token without verification
   - `refresh(token)` - Generate new token from refresh token

4. **password.service.ts**
   - `hash(password)` - Hash password with bcrypt
   - `compare(plain, hashed)` - Compare password with hash
   - `validateStrength(password)` - Validate password strength

### Frontend Functions

1. **auth.service.ts**
   - `login(credentials)` - Login user
   - `register(userData)` - Register user
   - `logout()` - Logout user
   - `isAuthenticated()` - Check authentication status
   - `getCurrentUser()` - Get current user data

2. **token.service.ts**
   - `getToken()` - Get stored token
   - `setToken(token)` - Store token
   - `removeToken()` - Remove token
   - `isTokenExpired()` - Check token expiration

3. **auth.guard.ts**
   - `canActivate()` - Route guard for authentication
   - `canActivateChild()` - Child route guard

4. **role.guard.ts**
   - `canActivate()` - Route guard for role-based access

## Database Query Map

### User Queries
- `findByEmail(email)` - Find user by email (indexed)
- `findById(id)` - Find user by ID
- `create(userData)` - Create new user
- `update(id, data)` - Update user data
- `delete(id)` - Soft delete user

### Role Queries
- `findByRoleName(name)` - Find role by name
- `getPermissions(roleId)` - Get role permissions
- `assignRole(userId, roleId)` - Assign role to user

### Session Queries
- `create(sessionData)` - Create session
- `findByToken(token)` - Find session by token
- `deleteByToken(token)` - Delete session
- `deleteExpired()` - Cleanup expired sessions

