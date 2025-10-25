@echo off
echo Starting MazeQuest AI...
echo.

echo Starting Backend Server...
start "Backend" cmd /k "cd backend && python -m venv venv && venv\Scripts\activate && pip install -r requirements.txt && uvicorn app.main:app --reload"

timeout /t 5 /nobreak >nul

echo Starting Frontend Server...
start "Frontend" cmd /k "cd frontend && npm install && npm run dev"

echo.
echo Both servers are starting up!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
pause
