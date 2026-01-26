# 🔧 Troubleshooting - Connection Refused Error

## ❌ Problem: "localhost refused to connect"

### ✅ Solution 1: Manual Start (Recommended)

**Step 1: Backend Start Karein**

Open **Terminal 1** (Command Prompt ya PowerShell):
```bash
cd "C:\Users\rahul\Desktop\sem 2 project\online-examination-system\backend"
npm run dev
```

**Wait for this message:**
```
🚀 Server running on http://localhost:3000
✅ All modules loaded successfully
```

**Step 2: Frontend Start Karein**

Open **Terminal 2** (NEW terminal - pehle wala mat band karo):
```bash
cd "C:\Users\rahul\Desktop\sem 2 project\online-examination-system\frontend"
ng serve
```

**Wait for this message:**
```
✔ Compiled successfully.
** Angular Live Development Server is listening on localhost:4200 **
```

**Step 3: Browser Mein Open Karein**

```
http://localhost:4200
```

### ✅ Solution 2: Use START_SERVERS_MANUAL.bat

**Double-click:**
```
START_SERVERS_MANUAL.bat
```

Ye automatically:
- Backend window kholega
- Frontend window kholega
- Dono servers start honge

**⚠️ Important:** Dono windows open rakhna - mat band karo!

### 🔍 Check Karne Ke Liye

**1. Backend Check:**
```
http://localhost:3000/health
```
Response: `{"status":"OK","message":"Server is running"}`

**2. Frontend Check:**
```
http://localhost:4200
```
Response: Login page dikhna chahiye

### 🐛 Common Issues

#### Issue 1: Port Already in Use

**Error:** `Port 3000 is already in use`

**Fix:**
```bash
# Find and kill process
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

#### Issue 2: MongoDB Not Running

**Error:** `Cannot connect to MongoDB`

**Fix:**
- MongoDB service start karo
- Ya MongoDB Atlas use karo
- `.env` file mein correct URL set karo

#### Issue 3: Dependencies Missing

**Error:** `Cannot find module`

**Fix:**
```bash
cd backend
npm install

cd ../frontend
npm install
```

#### Issue 4: Angular CLI Missing

**Error:** `ng: command not found`

**Fix:**
```bash
npm install -g @angular/cli
# Ya use npx:
npx ng serve
```

### 📋 Quick Checklist

Before starting:
- [ ] Node.js installed? (`node --version`)
- [ ] npm installed? (`npm --version`)
- [ ] MongoDB running?
- [ ] Ports 3000 and 4200 free?
- [ ] Dependencies installed? (`npm install` in both folders)

### 🎯 Step-by-Step Manual Start

**Terminal 1:**
```bash
cd "C:\Users\rahul\Desktop\sem 2 project\online-examination-system\backend"
npm install
npm run dev
```

**Terminal 2 (NEW):**
```bash
cd "C:\Users\rahul\Desktop\sem 2 project\online-examination-system\frontend"
npm install
ng serve
```

**Wait 30-40 seconds, then:**
```
http://localhost:4200
```

### 💡 Pro Tips

1. **Always check terminal windows** - Errors wahan dikhenge
2. **Wait for compilation** - Frontend takes time
3. **Don't close server windows** - Servers band ho jayenge
4. **Check MongoDB** - Backend needs database
5. **Use separate terminals** - Dono servers alag terminals mein

### 🆘 Still Not Working?

1. Check backend terminal - koi error?
2. Check frontend terminal - compilation successful?
3. Check MongoDB - running hai?
4. Check ports - available hain?
5. Restart computer - sometimes helps

---

**Most Reliable Method:**
```bash
# Terminal 1:
cd backend && npm run dev

# Terminal 2 (NEW):
cd frontend && ng serve

# Wait 30 seconds, then:
# Browser: http://localhost:4200
```

