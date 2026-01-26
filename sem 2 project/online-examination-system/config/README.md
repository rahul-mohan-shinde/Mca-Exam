# Configuration Files

This directory contains configuration files for the project.

## Files

- `database.config.ts` - Database connection configuration
- `jwt.config.ts` - JWT token configuration
- `email.config.ts` - Email service configuration
- `app.config.ts` - Application configuration

## Environment Variables

Create `.env` files in backend and frontend directories:

### Backend .env
```
DATABASE_URL=postgresql://user:password@localhost:5432/exam_db
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
PORT=3000
NODE_ENV=development
REDIS_URL=redis://localhost:6379
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
```

### Frontend .env
```
API_URL=http://localhost:3000/api
```

## Security Notes

- Never commit `.env` files
- Use strong JWT secrets
- Rotate secrets regularly
- Use environment-specific configurations

