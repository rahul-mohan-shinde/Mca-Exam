# 🔧 Connection Issues Fix Guide

## ❌ Error: "localhost refused to connect" / ERR_CONNECTION_REFUSED

### Problem: Servers Start Nahi Hue

## 🚀 Quick Fix - Step by Step

### Step 1: Check Servers Manually

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
ng serve
```

### Step 2: Wait for Servers to Start

**Backend:**
- Wait for: `🚀 Server running on http://localhost:3000`
- Time: ~10-15 seconds

**Frontend:**
- Wait for: `✔ Compiled successfully`
- Time: ~20-30 seconds

### Step 3: Check URLs

**Backend Health:**
```
http://localhost:3000/health
```
Should show: `{"status":"OK","message":"Server is running"}`

**Frontend:**
```
http://localhost:4200
```
Should show: Login page

## 🔍 Common Issues & Solutions

### Issue 1: Port Already in Use

**Error:** `Port 3000 is already in use` or `Port 4200 is already in use`

**Solution:**
```bash
# Find process using port
netstat -ano | findstr :3000
netstat -ano | findstr :4200

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or use different ports
# Backend: Change PORT in .env file
# Frontend: ng serve --port 4201
```

### Issue 2: MongoDB Not Running

**Error:** `Cannot connect to MongoDB`

**Solution:**
```bash
# Option 1: Start MongoDB locally
# Windows: Start MongoDB service
net start MongoDB

# Option 2: Use MongoDB Atlas (Cloud)
# Update DATABASE_URL in backend/.env
```

### Issue 3: Dependencies Not Installed

**Error:** `Cannot find module` or `npm command not found`

**Solution:**
```bash
# Install Node.js first: https://nodejs.org/
# Then install dependencies:
cd backend
npm install

cd ../frontend
npm install
```

### Issue 4: Angular CLI Not Installed

**Error:** `ng: command not found`

**Solution:**
```bash
# Install Angular CLI globally
npm install -g @angular/cli

# Or use npx
npx ng serve
```

### Issue 5: Backend Crashes on Start

**Check:**
1. MongoDB connection
2. .env file exists
3. All dependencies installed
4. Port 3000 available

**Solution:**
```bash
# Check backend logs
cd backend
npm run dev

# Look for error messages
# Common: Database connection error
```

### Issue 6: Frontend Compilation Errors

**Check:**
1. TypeScript errors
2. Missing dependencies
3. Angular version compatibility

**Solution:**
```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules
rm package-lock.json
npm install
ng serve
```

## ✅ Verification Steps

### 1. Check Backend

```bash
# Test backend health
curl http://localhost:3000/health

# Or browser mein:
http://localhost:3000/health
```

**Expected Response:**
```json
{"status":"OK","message":"Server is running"}
```

### 2. Check Frontend

```bash
# Browser mein open:
http://localhost:4200
```

**Expected:** Login page dikhna chahiye

### 3. Check Both Together

```bash
# Use CHECK_AND_START.bat
CHECK_AND_START.bat
```

## 🛠️ Manual Start (If Auto Script Fails)

### Backend Manual Start

```bash
# Terminal 1
cd online-examination-system\backend

# Install dependencies (first time only)
npm install

# Start server
npm run dev
```

**Wait for:**
```
🚀 Server running on http://localhost:3000
✅ All modules loaded successfully
```

### Frontend Manual Start

```bash
# Terminal 2 (new terminal)
cd online-examination-system\frontend

# Install dependencies (first time only)
npm install

# Start server
ng serve
# OR if Angular CLI not installed globally:
npx ng serve
```

**Wait for:**
```
✔ Compiled successfully.
** Angular Live Development Server is listening on localhost:4200 **
```

## 📋 Pre-requisites Checklist

Before starting, make sure:

- [ ] Node.js installed (v18+)
  ```bash
  node --version
  ```

- [ ] npm installed
  ```bash
  npm --version
  ```

- [ ] MongoDB running (local or Atlas)
  ```bash
  # Check MongoDB
  mongod --version
  ```

- [ ] Angular CLI installed (optional, can use npx)
  ```bash
  ng version
  ```

- [ ] Ports 3000 and 4200 available
  ```bash
  netstat -ano | findstr :3000
  netstat -ano | findstr :4200
  ```

## 🎯 Quick Fix Commands

```bash
# 1. Kill processes on ports
netstat -ano | findstr :3000
taskkill /PID <PID> /F

netstat -ano | findstr :4200
taskkill /PID <PID> /F

# 2. Start backend
cd backend
npm run dev

# 3. Start frontend (new terminal)
cd frontend
ng serve

# 4. Test
# Browser: http://localhost:4200
```

## 💡 Pro Tips

1. **Always check terminal windows** - Errors wahan dikhenge
2. **Wait for compilation** - Frontend takes 20-30 seconds
3. **Check MongoDB** - Backend needs database connection
4. **Use CHECK_AND_START.bat** - Better error handling
5. **Check firewall** - Sometimes blocks localhost

## 🆘 Still Not Working?

1. **Check backend terminal** - Koi error dikh raha hai?
2. **Check frontend terminal** - Compilation successful?
3. **Check MongoDB** - Running hai?
4. **Check ports** - Available hain?
5. **Restart everything** - Close all terminals and restart

---

**Most Common Fix:**
```bash
# Just restart both servers manually:
# Terminal 1: cd backend && npm run dev
# Terminal 2: cd frontend && ng serve
# Wait 30 seconds, then open http://localhost:4200
```

