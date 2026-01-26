@echo off
title Online Examination System - Starting...
color 0A

echo.
echo ========================================
echo   ONLINE EXAMINATION SYSTEM
echo   Complete MCA Project
echo ========================================
echo.

echo [1/5] Checking MongoDB...
echo Please ensure MongoDB is running!
echo.

echo [2/5] Installing Backend Dependencies...
cd backend
if not exist node_modules (
    echo Installing backend packages...
    call npm install
) else (
    echo Backend dependencies already installed.
)
cd ..

echo.
echo [3/5] Installing Frontend Dependencies...
cd frontend
if not exist node_modules (
    echo Installing frontend packages...
    call npm install
) else (
    echo Frontend dependencies already installed.
)
cd ..

echo.
echo [4/5] Starting Backend Server...
start "Backend Server - Port 3000" cmd /k "cd /d %~dp0backend && npm run dev"

timeout /t 5 /nobreak >nul

echo.
echo [5/5] Starting Frontend Server...
start "Frontend Server - Port 4200" cmd /k "cd /d %~dp0frontend && ng serve"

timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   SERVERS STARTED SUCCESSFULLY!
echo ========================================
echo.
echo Backend:  http://localhost:3000
echo Frontend: http://localhost:4200
echo.
echo Opening browser in 3 seconds...
timeout /t 3 /nobreak >nul

start http://localhost:4200

echo.
echo ========================================
echo   System is running!
echo   Close server windows to stop.
echo ========================================
echo.
pause

