@echo off
echo Starting Mental Health Assessment Application...

echo Starting Flask backend...
start cmd /k python app.py

echo Waiting for backend to initialize...
timeout /t 5

echo Starting React frontend...
cd react-app
start cmd /k npm start

echo Application started!
echo Backend running at: http://localhost:5000
echo Frontend running at: http://localhost:3000
