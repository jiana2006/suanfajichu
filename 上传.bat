@echo off
chcp 65001 >nul
title 上传到 GitHub

D:
cd /D D:\MkDocs\my-wiki

echo ========================================
echo   喵喵基础算法  -  上传到 GitHub
echo ========================================
echo.

echo [当前改动]
git status --short
echo.

set "MSG="
set /p MSG=提交说明（直接回车 = 更新网站）: 
if not defined MSG set "MSG=更新网站"

echo.
echo [1/3] git add .
git add .

echo [2/3] git commit -m "%MSG%"
git commit -m "%MSG%"
if errorlevel 1 (
  echo       ^(没有新改动，跳过 commit^)
)

echo [3/3] git push origin main
git push origin main
echo.

echo ========================================
echo   完成！等 1~2 分钟自动部署
echo   进度: https://github.com/jiana2006/suanfajichu/actions
echo   站点: https://jiana2006.github.io/suanfajichu/
echo ========================================
pause
