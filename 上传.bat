@echo off
chcp 65001 >nul
color 0A

echo =========================================
echo   开始上传喵喵基础算法...
echo =========================================

git add .

git commit -m "更新笔记 %date% %time%"
if %errorlevel% neq 0 (
    echo [提示] 没有新内容需要提交，或者 Git 还没配置好。
)

echo.
echo -----------------------------------------
echo   正在拉取云端代码，防止冲突...
git pull origin main
if %errorlevel% neq 0 (
    echo.
    echo ❌ [致命错误] 拉取失败！可能是网络断了，或者你的代码和同学的冲突了。
    echo 请关闭这个窗口，去终端手动解决一下冲突。
    pause
    exit /b
)

echo.
echo -----------------------------------------
echo   正在推送到 GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo.
    echo ❌ [致命错误] 推送失败！网络不通或者账号没权限。
    pause
    exit /b
)

echo.
echo =========================================
echo ✅ 上传成功！请等 1 分钟去 GitHub Actions 看看。
echo =========================================
pause