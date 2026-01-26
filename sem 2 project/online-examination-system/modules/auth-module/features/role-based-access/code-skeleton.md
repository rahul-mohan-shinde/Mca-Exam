# Code Skeleton: Role-Based Access

## Backend Middleware

### Role Middleware

```typescript
export const requireRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Step 1: Extract user from request (set by auth middleware)
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    // Step 2: Check if user role is allowed
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    
    // Step 3: Continue to next middleware
    next();
  };
};

// Usage in routes:
router.post('/exams', authMiddleware, requireRole('admin', 'examiner'), createExam);
```

### Permission Middleware

```typescript
export const requirePermission = (permission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    
    // Step 1: Fetch user role with permissions
    const role = await this.roleModel.findById(user.roleId).populate('permissions');
    
    // Step 2: Check if role has permission
    const hasPermission = role.permissions.some(p => p.name === permission);
    
    if (!hasPermission) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }
    
    next();
  };
};
```

## Frontend Guards

### Role Guard

```typescript
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'] as string[];
    const userRole = this.authService.getCurrentUser()?.role;
    
    if (requiredRoles && !requiredRoles.includes(userRole)) {
      this.router.navigate(['/unauthorized']);
      return false;
    }
    
    return true;
  }
}

// Usage in routes:
{
  path: 'admin',
  component: AdminComponent,
  canActivate: [RoleGuard],
  data: { roles: ['admin', 'super_admin'] }
}
```

