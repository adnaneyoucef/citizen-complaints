@echo off
start "Backend" cmd /k "cd backend && npm run dev"
start "Frontend" cmd /k "cd frontend && npm start"
echo Les deux serveurs sont en cours d'execution.
