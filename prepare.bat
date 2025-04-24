@echo off
setlocal EnableDelayedExpansion

REM === Create backend/.env if it doesn't exist ===
if not exist backend\.env (
  echo Creating backend\.env with default values...
  (
    echo PORT=5000
    echo MONGO_URI=mongodb://localhost:27017/citizen-complaints
    echo JWT_SECRET=changeme123
    echo MAIL_USER=youraddress@gmail.com
    echo MAIL_PASS=your-app-password
  ) > backend\.env
  echo backend\.env created.
)

REM === Load environment variables from .env ===
if not exist backend\.env (
  echo [ERROR] .env file not found!
  pause
  exit /b 1
)

for /f "usebackq tokens=* delims=" %%L in ("backend\.env") do (
  set "line=%%L"
  echo Processing line: !line!

  if "!line!"=="" (
    echo Skipping blank line
    continue
  )

  if "!line:~0,1!"=="#" (
    echo Skipping comment line
    continue
  )

  for /f "tokens=1,* delims==" %%A in ("!line!") do (
    set "key=%%A"
    set "val=%%B"

    call :trim key
    call :trim val

    REM Remove quotes
    if "!val:~0,1!"=="\"" if "!val:~-1!"=="\"" (
      set "val=!val:~1,-1!"
    )

    set "!key!=!val!"
    echo Set !key! = !val!
  )
)

REM Debug output
echo.
echo === Loaded Environment Variables ===
set PORT
set JWT_SECRET
echo.

REM --- Install backend dependencies ---
echo [SETUP] Installing backend dependencies if needed...
pushd backend
if not exist node_modules (
  npm install
  if %ERRORLEVEL% neq 0 (
    echo [ERROR] Backend dependency install failed!
    popd
    exit /b 1
  )
) else (
  echo [SETUP] Backend dependencies already installed.
)

REM --- Run admin creation script ---
echo [SETUP] Creating admin user (if not exists)...
node scripts\create-admin.js
if %ERRORLEVEL% neq 0 (
  echo [ERROR] Failed to create admin user.
  popd
  exit /b 1
)
popd

REM --- Install frontend dependencies ---
echo [SETUP] Installing frontend dependencies if needed...
pushd frontend
if not exist node_modules (
  npm install
  if %ERRORLEVEL% neq 0 (
    echo [ERROR] Frontend dependency install failed!
    popd
    exit /b 1
  )
) else (
  echo [SETUP] Frontend dependencies already installed.
)
popd

REM --- Start backend and frontend servers ---
echo [SETUP] Starting backend and frontend servers...
start "Backend" cmd /k "cd backend && npm run dev"
start "Frontend" cmd /k "cd frontend && npm start"

echo [SETUP] All servers running. Open http://localhost:3000 in your browser.
pause

:trim
setlocal EnableDelayedExpansion
set "str=!%1!"
for /f "tokens=* delims= " %%a in ("!str!") do set "str=%%a"
:loop
if not "!str!"=="" (
  set "last=!str:~-1!"
  if "!last!"==" " (
    set "str=!str:~0,-1!"
    goto loop
  )
)
endlocal & set "%1=%str%"
exit /b