# Feature Code Flow: Role-Based Access

## Flow

```
Request → Auth Middleware → Extract User → Role Middleware → 
Check Permissions → Allow/Deny → Route Handler
```

