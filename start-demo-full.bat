@echo off
echo Running prepare.bat - Installing backend & Admin creation...
call prepare.bat

echo Running prepare.bat - Installing frontend...
call prepare.bat

echo prepare.bat - Launching the app... check your browser.
call prepare.bat

echo All runs completed.
pause