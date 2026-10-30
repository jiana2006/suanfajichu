@echo off
chcp 65001 >nul
title 上传到 GitHub

D:
cd /D D:\MkDocs\my-wiki

echo ========================================
echo   喵喵基础算法 - 上传到 GitHub
echo ========================================
echo.

echo [1/3] 检查改动...
git status --short
echo.

echo [2/3] 提交...
git add -A
git commit -m "更新ing"
echo.

echo [3/3] 推送...
git push
echo.

echo ========================================
echo   完成！等 1~2 分钟自动部署
echo   进度: https://github.com/jiana2006/suanfajichu/actions
echo   站点: https://jiana2006.github.io/suanfajichu/
echo ========================================
pause
