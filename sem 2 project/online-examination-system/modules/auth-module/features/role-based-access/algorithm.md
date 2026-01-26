# Algorithm: Role-Based Access Control

## Algorithm Name
**Role-Based Access Control Algorithm (RBACA)**

## Steps

```
ALGORITHM: CheckRoleAccess
INPUT: user, requiredRole, requiredPermission
OUTPUT: allow/deny

BEGIN
    1. EXTRACT user from request token
    2. IF user is NULL THEN RETURN deny
    3. FETCH user role and permissions
    4. CHECK role hierarchy
    5. CHECK permission matrix
    6. IF has access THEN RETURN allow
    7. ELSE RETURN deny
END
```

**Time Complexity**: O(1) - Permission lookup
**Security**: Token-based verification

