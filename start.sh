#!/bin/bash

echo "Starting MazeQuest AI..."
echo

echo "Starting Backend Server..."
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload &
BACKEND_PID=$!

echo "Waiting for backend to start..."
sleep 5

echo "Starting Frontend Server..."
cd ../frontend
npm install
npm run dev &
FRONTEND_PID=$!

echo
echo "Both servers are starting up!"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo
echo "Press Ctrl+C to stop both servers"

# Function to cleanup on exit
cleanup() {
    echo "Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait
