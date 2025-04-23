@echo off
REM Installs all dependencies for backend and frontend, then starts both servers

cd backend
if exist node_modules (
  echo Backend dependencies already installed.
) else (
  echo Installing backend dependencies...
  npm install
)
cd ..

cd frontend
if exist node_modules (
  echo Frontend dependencies already installed.
) else (
  echo Installing frontend dependencies...
  npm install
)
cd ..

start "Backend" cmd /k "cd backend && npm run dev"
start "Frontend" cmd /k "cd frontend && npm start"
echo All dependencies installed. Both servers are running.
