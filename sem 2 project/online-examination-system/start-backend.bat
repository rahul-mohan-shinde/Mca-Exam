@echo off
echo Starting Backend Server...
cd backend
if not exist node_modules (
    echo Installing dependencies...
    call npm install
)
echo Starting server...
call npm run dev

