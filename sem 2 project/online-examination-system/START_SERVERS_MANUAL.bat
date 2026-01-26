@echo off
chcp 65001 >nul
echo ========================================
echo   Manual Server Start
echo   This will start servers in separate windows
echo ========================================
echo.
echo IMPORTANT: Keep both windows open!
echo.
pause

cd /d "%~dp0"

echo.
echo [1/2] Starting Backend Server...
echo      Window will open - DO NOT CLOSE IT
echo.
start "🔴 BACKEND SERVER - DO NOT CLOSE" cmd /k "cd backend && echo Starting Backend... && npm run dev"

timeout /t 5 /nobreak >nul

echo.
echo [2/2] Starting Frontend Server...
echo      Window will open - DO NOT CLOSE IT
echo.
start "🟢 FRONTEND SERVER - DO NOT CLOSE" cmd /k "cd frontend && echo Starting Frontend... && ng serve"

echo.
echo ========================================
echo   Servers Starting...
echo ========================================
echo.
echo ✅ Two windows opened:
echo    1. Backend Server (port 3000)
echo    2. Frontend Server (port 4200)
echo.
echo ⏳ Please wait 30-40 seconds for servers to start
echo.
echo 📋 Check the windows for:
echo    Backend: "Server running on http://localhost:3000"
echo    Frontend: "Compiled successfully"
echo.
echo 🌐 Then open: http://localhost:4200
echo.
echo ⚠️  DO NOT CLOSE the server windows!
echo.
pause

