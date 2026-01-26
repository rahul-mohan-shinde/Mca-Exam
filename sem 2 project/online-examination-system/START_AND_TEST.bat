@echo off
echo ========================================
echo   Online Examination System
echo   Starting Servers and Opening Test Page
echo ========================================
echo.

cd /d "%~dp0"

echo [1/4] Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm install && npm run dev"
timeout /t 3 /nobreak >nul

echo [2/4] Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm install && ng serve"
timeout /t 5 /nobreak >nul

echo [3/4] Waiting for servers to start...
timeout /t 10 /nobreak >nul

echo [4/4] Opening Test Launcher...
start "" "TEST_LAUNCHER.html"

echo.
echo ========================================
echo   Servers Starting...
echo   Test Launcher opened in browser
echo ========================================
echo.
echo Backend: http://localhost:3000
echo Frontend: http://localhost:4200
echo.
echo Press any key to exit...
pause >nul

