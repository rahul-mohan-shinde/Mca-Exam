@echo off
echo Starting Frontend Server...
cd frontend
if not exist node_modules (
    echo Installing dependencies...
    call npm install
)
echo Starting Angular dev server...
call ng serve

