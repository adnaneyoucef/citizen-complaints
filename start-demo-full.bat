@echo off
setlocal EnableDelayedExpansion

REM === Load environment variables from .env ===
if not exist backend\.env (
  echo [ERROR] .env file not found!
  pause
  exit /b 1
)

for /f "usebackq tokens=* delims=" %%L in (".env") do (
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

goto install

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

:install
REM === Dependency installation ===
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

REM === Start servers ===
start "Backend" cmd /k "cd backend && npm run dev"
start "Frontend" cmd /k "cd frontend && npm start"

echo All servers running.
pause