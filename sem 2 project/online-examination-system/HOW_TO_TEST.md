# 🧪 Project Testing Guide - Kaise Test Karein

## 🚀 Quick Start - Project Run Karne Ke Liye

### Option 1: Automatic (Easiest) ⚡

```bash
# Just double-click ya run:
START_PROJECT.bat
```

Ye automatically:
- ✅ Backend dependencies install karega
- ✅ Frontend dependencies install karega
- ✅ Backend start karega (port 3000)
- ✅ Frontend start karega (port 4200)
- ✅ Browser open karega

### Option 2: Manual Run

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
ng serve
```

## 📋 Step-by-Step Testing Guide

### Step 1: Database Setup ✅

**MongoDB Start Karein:**
```bash
# MongoDB ko start karein (agar locally installed hai)
# Ya MongoDB Atlas use karein (cloud)

# Backend ke .env file mein database URL set karein:
# DATABASE_URL=mongodb://localhost:27017/online_exam_system
```

### Step 2: Backend Test Karein ✅

**Backend Start:**
```bash
cd backend
npm run dev
```

**Expected Output:**
```
🚀 Server running on http://localhost:3000
📚 API Documentation: http://localhost:3000/health
✅ All modules loaded successfully
```

**Health Check:**
- Browser mein open karein: `http://localhost:3000/health`
- Response: `{"status":"OK","message":"Server is running"}`

### Step 3: Frontend Test Karein ✅

**Frontend Start:**
```bash
cd frontend
ng serve
```

**Expected Output:**
```
✔ Compiled successfully.
** Angular Live Development Server is listening on localhost:4200 **
```

**Browser Mein Open:**
- URL: `http://localhost:4200`
- Login page dikhna chahiye

### Step 4: Feature Testing ✅

#### 4.1 Authentication Testing

**A. Registration Test:**
1. `/register` page pe jao
2. Form fill karo:
   - Name: "Test User"
   - Email: "test@example.com"
   - Password: "Test@123" (uppercase, lowercase, number, special char)
   - Confirm Password: "Test@123"
3. Submit button click karo
4. Success: Login page pe redirect hoga

**Validation Tests:**
- ❌ Empty fields - Error show hoga
- ❌ Invalid email - Error show hoga
- ❌ Weak password - Error show hoga
- ❌ Password mismatch - Error show hoga

**B. Login Test:**
1. `/login` page pe jao
2. Credentials enter karo:
   - Email: "test@example.com"
   - Password: "Test@123"
3. Login button click karo
4. Success: Dashboard pe redirect hoga

**Validation Tests:**
- ❌ Wrong email - Error show hoga
- ❌ Wrong password - Error show hoga
- ❌ Empty fields - Error show hoga

#### 4.2 Admin Features Testing

**A. Admin Dashboard:**
1. Admin role se login karo
2. `/admin` pe jao
3. Check karo:
   - ✅ Statistics cards dikh rahe hain
   - ✅ Performance metrics dikh rahe hain
   - ✅ Recent activities dikh rahe hain

**B. Question Management:**
1. `/questions` pe jao
2. "Create Question" button click karo
3. Question form fill karo:
   - Question Text: "What is 2+2?"
   - Type: MCQ
   - Difficulty: Easy
   - Marks: 5
   - Options: Add 4 options, mark one as correct
4. Submit karo
5. Success: Question list mein dikhega

**Validation Tests:**
- ❌ Empty question text - Error
- ❌ MCQ without options - Error
- ❌ MCQ without correct option - Error
- ❌ Duplicate options - Error
- ❌ Less than 2 options - Error
- ❌ More than 6 options - Error

**C. Exam Management:**
1. `/exams` pe jao
2. "Create Exam" button click karo
3. Exam form fill karo:
   - Exam Name: "Math Test"
   - Duration: 60 minutes
   - Total Marks: 100
   - Passing Score: 50
   - Start Time: Future date
   - End Time: After start time
   - Status: ACTIVE
4. Submit karo
5. Success: Exam list mein dikhega

**Validation Tests:**
- ❌ Past start time - Error
- ❌ End time before start - Error
- ❌ Passing score > total marks - Error
- ❌ Invalid duration - Error

#### 4.3 Student Features Testing

**A. Student Dashboard:**
1. Student role se login karo
2. `/student` pe jao
3. Check karo:
   - ✅ Available exams dikh rahe hain
   - ✅ Recent attempts dikh rahe hain

**B. Exam Taking:**
1. Available exam pe "Start Exam" click karo
2. Exam page open hoga
3. Questions answer karo:
   - MCQ: Option select karo
   - True/False: Select karo
   - Short Answer: Text type karo
4. Timer check karo:
   - ✅ Timer countdown ho raha hai
   - ✅ 5 minutes pe warning aayega
   - ✅ 1 minute pe warning aayega
5. Auto-save check karo:
   - ✅ Answers automatically save ho rahe hain (every 30s)
6. Submit button click karo
7. Success: Result page pe redirect hoga

**Validation Tests:**
- ❌ Time up - Auto submit
- ❌ Network error - Error message
- ❌ Empty answers - Warning before submit

**C. Result View:**
1. Result page pe jao
2. Check karo:
   - ✅ Marks obtained
   - ✅ Percentage
   - ✅ Grade
   - ✅ Pass/Fail status
   - ✅ Answer review

#### 4.4 Navigation Testing

1. Navbar check karo:
   - ✅ Role-based menu dikh raha hai
   - ✅ User name dikh raha hai
   - ✅ Logout button kaam kar raha hai

2. Route protection check karo:
   - ✅ Unauthorized access - Login pe redirect
   - ✅ Role-based access - Correct pages

## 🧪 Automated Tests Run Karne Ke Liye

### Backend Tests

```bash
cd backend

# All tests
npm test

# Unit tests only
npm run test:unit

# Integration tests only
npm run test:integration

# With coverage report
npm run test:coverage
```

**Expected Output:**
```
PASS  tests/unit/auth/auth.service.test.ts
PASS  tests/integration/auth/login.test.ts
...
Test Suites: 12 passed
Tests:       50+ passed
```

### Frontend Tests

```bash
cd frontend

# All tests
npm test

# With coverage
npm test -- --code-coverage

# Watch mode (auto-run on changes)
npm test -- --watch
```

**Expected Output:**
```
Chrome Headless: Executed 15 of 15 SUCCESS
```

## 📊 Test Coverage Check

### Backend Coverage

```bash
cd backend
npm run test:coverage
```

Coverage report `backend/coverage` folder mein generate hoga.

**Target Coverage:**
- ✅ Statements: 80%+
- ✅ Branches: 80%+
- ✅ Functions: 80%+
- ✅ Lines: 80%+

### Frontend Coverage

```bash
cd frontend
npm test -- --code-coverage
```

Coverage report `frontend/coverage` folder mein generate hoga.

## 🔍 Manual Testing Checklist

### Authentication ✅
- [ ] User Registration
- [ ] User Login
- [ ] Password Validation
- [ ] Email Validation
- [ ] Logout
- [ ] Session Management

### Question Bank ✅
- [ ] Create Question (MCQ)
- [ ] Create Question (True/False)
- [ ] Create Question (Short Answer)
- [ ] Create Question (Essay)
- [ ] Edit Question
- [ ] Delete Question
- [ ] List Questions
- [ ] Filter Questions
- [ ] Category Management

### Exam Management ✅
- [ ] Create Exam
- [ ] Edit Exam
- [ ] Delete Exam
- [ ] List Exams
- [ ] Generate Question Paper
- [ ] Random Selection

### Student Features ✅
- [ ] View Available Exams
- [ ] Start Exam
- [ ] Answer Questions
- [ ] Auto-Save Answers
- [ ] Timer Functionality
- [ ] Submit Exam
- [ ] View Results
- [ ] View History

### Admin Features ✅
- [ ] Dashboard Statistics
- [ ] Performance Metrics
- [ ] Recent Activities

### Notifications ✅
- [ ] View Notifications
- [ ] Mark as Read
- [ ] Unread Count

## 🐛 Common Issues & Solutions

### Issue 1: Backend Not Starting

**Problem:** `Cannot connect to MongoDB`

**Solution:**
```bash
# MongoDB start karein
# Ya .env file mein correct DATABASE_URL set karein
```

### Issue 2: Frontend Not Starting

**Problem:** `Port 4200 already in use`

**Solution:**
```bash
# Different port use karein
ng serve --port 4201
```

### Issue 3: Tests Failing

**Problem:** Tests fail ho rahe hain

**Solution:**
```bash
# Dependencies reinstall karein
cd backend
npm install

cd ../frontend
npm install
```

### Issue 4: Validation Errors

**Problem:** Forms submit nahi ho rahe

**Solution:**
- Browser console check karein
- Network tab mein API errors check karein
- Form validation messages read karein

## 📝 Testing Scenarios

### Scenario 1: Complete Student Flow

1. Register as Student
2. Login
3. View Available Exams
4. Start Exam
5. Answer All Questions
6. Submit Exam
7. View Result
8. Check History

### Scenario 2: Complete Admin Flow

1. Register as Admin
2. Login
3. View Dashboard
4. Create Questions
5. Create Exam
6. Generate Question Paper
7. View Statistics

### Scenario 3: Edge Cases

1. Empty Forms
2. Invalid Data
3. Network Errors
4. Timeout Scenarios
5. Browser Refresh
6. Multiple Tabs

## ✅ Success Criteria

**Project successfully test ho gaya agar:**
- ✅ Backend server start ho raha hai
- ✅ Frontend app load ho raha hai
- ✅ User registration kaam kar raha hai
- ✅ User login kaam kar raha hai
- ✅ Questions create/edit/delete ho rahe hain
- ✅ Exams create/edit/delete ho rahe hain
- ✅ Students exam de sakte hain
- ✅ Results calculate ho rahe hain
- ✅ All validations kaam kar rahe hain
- ✅ All tests pass ho rahe hain

## 🎯 Quick Test Commands

```bash
# Complete project start
START_PROJECT.bat

# Backend only
cd backend && npm run dev

# Frontend only
cd frontend && ng serve

# Run all tests
cd backend && npm test
cd frontend && npm test

# Check health
curl http://localhost:3000/health
```

---

**🎉 Testing Complete!**

Agar koi issue aaye to:
1. Browser console check karein
2. Network tab check karein
3. Backend logs check karein
4. Error messages read karein

**Happy Testing!** 🚀

