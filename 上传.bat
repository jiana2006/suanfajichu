@echo off
color 0A
echo =========================================
echo   Starting Upload Process...
echo =========================================

git add .
git commit -m "Update notes %date% %time%"

echo.
echo [1/2] Pulling latest code...
git pull origin main
if %errorlevel% neq 0 (
    echo [ERROR] Pull failed! Check your network or conflicts.
    pause
    exit /b
)

echo.
echo [2/2] Pushing to GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo [ERROR] Push failed! Check your network or account permissions.
    pause
    exit /b
)

echo.
echo =========================================
echo SUCCESS! Your website will update in 1 minute.
echo =========================================
pause