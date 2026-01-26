# Role-Based Access Control Feature

## Overview

Role-Based Access Control (RBAC) manages user permissions based on their roles. It restricts access to resources and actions based on user roles.

## Feature Description

### Purpose
- Define user roles (Super Admin, Admin, Examiner, Student)
- Assign permissions to roles
- Protect routes and resources
- Control feature access

### Roles Hierarchy
```
Super Admin > Admin > Examiner > Student
```

### Permissions Matrix
- **Super Admin**: All permissions
- **Admin**: Manage exams, users, view results
- **Examiner**: Create exams, view results
- **Student**: Take exams, view own results

## Technical Specifications

### Middleware
- `auth.middleware.ts` - Verify authentication
- `role.middleware.ts` - Check role permissions

### Guards (Frontend)
- `auth.guard.ts` - Route protection
- `role.guard.ts` - Role-based route protection

## Algorithm

```
ALGORITHM: RoleBasedAccess
1. EXTRACT user from token
2. FETCH user role and permissions
3. CHECK if role has required permission
4. ALLOW or DENY access
END
```

**Time Complexity**: O(1) - Permission lookup
**Security**: Token-based, middleware protection

