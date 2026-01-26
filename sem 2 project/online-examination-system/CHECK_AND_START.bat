@echo off
chcp 65001 >nul
echo ========================================
echo   Online Examination System
echo   Checking and Starting Servers
echo ========================================
echo.

cd /d "%~dp0"

:: Check if MongoDB is needed
echo [INFO] Checking MongoDB connection...
echo.

:: Check if backend is already running
echo [1/5] Checking Backend Server...
curl -s http://localhost:3000/health >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Backend already running on port 3000
) else (
    echo ⚠️  Backend not running, starting...
    if not exist "backend\node_modules" (
        echo [INFO] Installing backend dependencies...
        cd backend
        call npm install
        cd ..
    )
    start "Backend Server - Port 3000" cmd /k "cd backend && npm run dev"
    echo [INFO] Backend starting... Please wait 10-15 seconds
    timeout /t 15 /nobreak >nul
)

:: Check if frontend is already running
echo.
echo [2/5] Checking Frontend Server...
curl -s http://localhost:4200 >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Frontend already running on port 4200
) else (
    echo ⚠️  Frontend not running, starting...
    if not exist "frontend\node_modules" (
        echo [INFO] Installing frontend dependencies...
        cd frontend
        call npm install
        cd ..
    )
    start "Frontend Server - Port 4200" cmd /k "cd frontend && ng serve"
    echo [INFO] Frontend starting... Please wait 20-30 seconds
    timeout /t 25 /nobreak >nul
)

:: Verify servers
echo.
echo [3/5] Verifying servers...
timeout /t 5 /nobreak >nul

curl -s http://localhost:3000/health >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Backend is running!
    set BACKEND_OK=1
) else (
    echo ❌ Backend failed to start
    set BACKEND_OK=0
)

curl -s http://localhost:4200 >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Frontend is running!
    set FRONTEND_OK=1
) else (
    echo ❌ Frontend failed to start
    set FRONTEND_OK=0
)

:: Open test launcher
echo.
echo [4/5] Opening Test Launcher...
if exist "TEST_LAUNCHER.html" (
    start "" "TEST_LAUNCHER.html"
) else (
    start "" "http://localhost:4200"
)

:: Display status
echo.
echo ========================================
echo   Server Status
echo ========================================
if %BACKEND_OK% == 1 (
    echo ✅ Backend:  http://localhost:3000
) else (
    echo ❌ Backend:  Not running (check backend window)
)
if %FRONTEND_OK% == 1 (
    echo ✅ Frontend: http://localhost:4200
) else (
    echo ❌ Frontend: Not running (check frontend window)
)
echo.
echo ========================================
echo   Next Steps
echo ========================================
echo.
if %BACKEND_OK% == 0 (
    echo ⚠️  Backend not started:
    echo    1. Check backend window for errors
    echo    2. Make sure MongoDB is running
    echo    3. Check if port 3000 is available
    echo.
)
if %FRONTEND_OK% == 0 (
    echo ⚠️  Frontend not started:
    echo    1. Check frontend window for errors
    echo    2. Make sure Angular CLI is installed
    echo    3. Check if port 4200 is available
    echo.
)
if %BACKEND_OK% == 1 if %FRONTEND_OK% == 1 (
    echo ✅ Both servers running!
    echo    Open: http://localhost:4200
    echo.
)
echo Press any key to exit...
pause >nul

