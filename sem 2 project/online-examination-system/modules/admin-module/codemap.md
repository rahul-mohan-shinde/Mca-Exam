# Code Map: Admin Module

## File Structure

```
admin-module/
├── backend/
│   ├── controllers/
│   │   ├── admin.controller.ts
│   │   ├── user-management.controller.ts
│   │   └── analytics.controller.ts
│   ├── services/
│   │   ├── admin.service.ts
│   │   ├── user-management.service.ts
│   │   └── analytics.service.ts
│   └── routes/
│       └── admin.routes.ts
└── frontend/
    ├── components/
    │   ├── dashboard/
    │   ├── user-management/
    │   └── analytics/
    └── services/
        └── admin.service.ts
```

## Function Call Flow

```
Admin Component → Admin Service → HTTP Request → 
Admin Routes → Admin Controller → Admin Service → 
Database Models → Response
```

