# 🚀 Setup Instructions - Online Examination System

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (running locally or MongoDB Atlas)
- Angular CLI (will be installed globally)

## Backend Setup

### Step 1: Navigate to backend directory
```bash
cd backend
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Create .env file
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```
DATABASE_URL=mongodb://localhost:27017/online_exam_system
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
PORT=3000
NODE_ENV=development
```

### Step 4: Start MongoDB
Make sure MongoDB is running on your system.

### Step 5: Run backend server
```bash
npm run dev
```

Backend will run on `http://localhost:3000`

## Frontend Setup

### Step 1: Navigate to frontend directory
```bash
cd frontend
```

### Step 2: Install Angular CLI globally (if not installed)
```bash
npm install -g @angular/cli
```

### Step 3: Install dependencies
```bash
npm install
```

### Step 4: Update API URL (if needed)
Edit `src/app/services/auth.service.ts` and update:
```typescript
private apiUrl = 'http://localhost:3000/api/auth';
```

### Step 5: Run frontend
```bash
ng serve
```

Frontend will run on `http://localhost:4200`

## Testing the Application

### 1. Register a new user
- Navigate to `http://localhost:4200/register`
- Fill in the registration form
- Submit

### 2. Login
- Navigate to `http://localhost:4200/login`
- Use registered credentials
- You should be redirected to dashboard based on role

### 3. API Testing
You can test API endpoints using Postman or curl:

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!@#"}'
```

**Register:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test123!@#","confirmPassword":"Test123!@#"}'
```

## Project Structure

```
online-examination-system/
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   └── auth/
│   │   │       ├── controller/
│   │   │       ├── service/
│   │   │       ├── repository/
│   │   │       ├── routes/
│   │   │       ├── dto/
│   │   │       └── model/
│   │   ├── middlewares/
│   │   ├── database/
│   │   └── app.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── modules/
│   │       ├── services/
│   │       ├── guards/
│   │       └── interceptors/
│   ├── package.json
│   └── angular.json
└── README.md
```

## Troubleshooting

### Backend Issues

1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify DATABASE_URL in .env file

2. **Port Already in Use**
   - Change PORT in .env file
   - Or kill the process using port 3000

3. **Module Not Found Errors**
   - Run `npm install` again
   - Check if all dependencies are installed

### Frontend Issues

1. **CORS Errors**
   - Backend CORS is already configured
   - Check if backend is running

2. **API Connection Errors**
   - Verify API URL in auth.service.ts
   - Check if backend server is running

3. **Build Errors**
   - Run `npm install` again
   - Clear node_modules and reinstall

## Next Steps

1. Create default roles in database
2. Implement email verification
3. Add more modules (Admin, Student, Exam Management)
4. Implement exam taking functionality
5. Add result calculation and reporting

## Support

For issues or questions, refer to the module documentation in `/modules/` directory.

