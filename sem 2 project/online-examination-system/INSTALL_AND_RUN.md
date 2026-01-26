# 🚀 Install and Run - Complete Guide

## ⚡ Quick Start (Auto-Run)

### Option 1: Run Everything Automatically (Windows)

```bash
# Double-click or run:
start-all.bat
```

This will:
- ✅ Install backend dependencies (if needed)
- ✅ Install frontend dependencies (if needed)
- ✅ Start backend server (port 3000)
- ✅ Start frontend server (port 4200)

### Option 2: Run Separately

**Backend:**
```bash
start-backend.bat
```

**Frontend:**
```bash
start-frontend.bat
```

## 📦 Manual Installation

### Prerequisites

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify: `node --version`

2. **MongoDB** (Running locally or MongoDB Atlas)
   - Local: Install MongoDB Community Edition
   - Cloud: Use MongoDB Atlas (free tier available)

3. **Angular CLI** (for frontend)
   ```bash
   npm install -g @angular/cli
   ```

### Step 1: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env file with your settings:
# DATABASE_URL=mongodb://localhost:27017/online_exam_system
# JWT_SECRET=your-secret-key
# PORT=3000

# Start server
npm run dev
```

✅ Backend will run on: `http://localhost:3000`

### Step 2: Frontend Setup

```bash
# Navigate to frontend (in new terminal)
cd frontend

# Install dependencies
npm install

# Start Angular dev server
ng serve
# OR if Angular CLI not installed globally:
npx ng serve
```

✅ Frontend will run on: `http://localhost:4200`

### Step 3: Database Initialization

The database will be automatically initialized when backend starts. It will create:
- ✅ Default roles (super_admin, admin, examiner, student)
- ✅ Default categories (Mathematics, Science, English, Computer Science)

## 🧪 Test the Application

1. **Open Browser**: `http://localhost:4200`
2. **Register**: Create a new account
3. **Login**: Use your credentials
4. **Access Dashboard**: Based on your role

## 📁 All Modules Available

### Backend API Endpoints

**Authentication:**
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

**Admin:**
- `GET /api/admin/dashboard`

**Question Bank:**
- `POST /api/questions/questions` - Create question
- `GET /api/questions/questions` - Get all questions
- `GET /api/questions/questions/:id` - Get question by ID
- `PUT /api/questions/questions/:id` - Update question
- `DELETE /api/questions/questions/:id` - Delete question
- `POST /api/questions/categories` - Create category
- `GET /api/questions/categories` - Get all categories

**Exam Management:**
- `POST /api/exams/exams` - Create exam
- `POST /api/exams/exams/generate-paper` - Generate question paper
- `GET /api/exams/exams` - Get all exams
- `GET /api/exams/exams/:id` - Get exam by ID
- `GET /api/exams/exams/:id/questions` - Get exam questions

**Student:**
- `POST /api/student/start-exam` - Start exam
- `GET /api/student/exams/:examId/questions` - Get exam questions
- `POST /api/student/save-answer` - Save answer
- `POST /api/student/submit-exam` - Submit exam
- `GET /api/student/attempts` - Get student attempts

**Results:**
- `POST /api/results/calculate` - Calculate result
- `GET /api/results/:attemptId` - Get result
- `GET /api/results/analytics` - Get analytics

## 🔧 Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
```bash
# Check if MongoDB is running
# Windows: Check Services
# Mac/Linux: sudo systemctl status mongod
```

**Port Already in Use:**
```bash
# Change PORT in .env file
# Or kill process using port 3000
```

**Module Not Found:**
```bash
cd backend
rm -rf node_modules
npm install
```

### Frontend Issues

**Angular CLI Not Found:**
```bash
npm install -g @angular/cli
# OR use: npx ng serve
```

**Port Already in Use:**
```bash
# Kill process on port 4200
# OR change port: ng serve --port 4201
```

**Build Errors:**
```bash
cd frontend
rm -rf node_modules
npm install
```

## 📊 Database Schema

All models are automatically created when you first run the application:
- Users
- Roles
- Sessions
- Questions
- Options
- Categories
- Exams
- ExamQuestions
- ExamAttempts
- Answers

## 🎯 Next Steps

1. **Create Admin User**: Register and manually update role in database
2. **Create Questions**: Use question bank API
3. **Create Exams**: Use exam management API
4. **Take Exams**: Use student API
5. **View Results**: Use result API

## 💡 Pro Tips

1. Use **Postman** to test API endpoints
2. Check **browser console** for frontend errors
3. Check **terminal** for backend logs
4. Use **MongoDB Compass** to view database

---

**🎉 Your complete Online Examination System is ready!**

All 8 modules are implemented and ready to use!

