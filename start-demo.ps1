# Script PowerShell pour lancer backend et frontend simultanément
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd backend; npm run dev'
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd frontend; npm start'
Write-Host "Les deux serveurs sont en cours d'exécution."
