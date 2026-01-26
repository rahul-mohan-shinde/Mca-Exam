@echo off
echo ========================================
echo Starting Online Examination System
echo ========================================
echo.
echo Starting Backend and Frontend...
echo.

start "Backend Server" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak >nul
start "Frontend Server" cmd /k "cd frontend && ng serve"

echo.
echo ========================================
echo Both servers are starting...
echo Backend: http://localhost:3000
echo Frontend: http://localhost:4200
echo ========================================
pause

