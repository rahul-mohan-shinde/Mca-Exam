@echo off
echo ========================================
echo   ONLINE EXAMINATION SYSTEM
echo   Starting All Services...
echo ========================================
echo.

cd backend
echo [1/4] Checking backend dependencies...
if not exist node_modules (
    echo Installing backend dependencies...
    call npm install
) else (
    echo Backend dependencies OK
)

echo.
echo [2/4] Checking .env file...
if not exist .env (
    echo Creating .env file...
    copy .env.example .env >nul
    echo .env file created! Please edit it with your settings.
)

echo.
echo [3/4] Starting Backend Server...
start "Backend Server - Port 3000" cmd /k "cd /d %~dp0backend && npm run dev"

timeout /t 5 /nobreak >nul

cd ..\frontend
echo [4/4] Checking frontend dependencies...
if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo Frontend dependencies OK
)

echo.
echo Starting Frontend Server...
start "Frontend Server - Port 4200" cmd /k "cd /d %~dp0frontend && ng serve"

echo.
echo ========================================
echo   SERVERS STARTING...
echo ========================================
echo.
echo Backend:  http://localhost:3000
echo Frontend: http://localhost:4200
echo.
echo Press any key to open browser...
pause >nul

start http://localhost:4200

echo.
echo ========================================
echo   System is running!
echo   Close the server windows to stop.
echo ========================================
pause

