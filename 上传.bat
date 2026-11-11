@echo off
echo ===============================
echo  Starting Git Push...
echo ===============================
git add .
git commit -m "auto update %date% %time%"
git pull origin main
git push origin main
echo.
echo ===============================
echo  Push Finished!
echo ===============================
pause