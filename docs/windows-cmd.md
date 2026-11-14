# Windows 常用 CMD 命令速查手册

> 适用范围：Windows 10 / Windows 11 自带 `cmd.exe`
> 提示：命令不区分大小写；路径含空格时用英文双引号包裹，如 `cd "D:\My Files"`
> 查看任意命令的完整帮助：`命令 /?`（例：`xcopy /?`）

---

## 目录

1. [文件与目录操作](#1-文件与目录操作)
2. [文件内容查看与处理](#2-文件内容查看与处理)
3. [系统信息与诊断](#3-系统信息与诊断)
4. [网络相关](#4-网络相关)
5. [进程与服务管理](#5-进程与服务管理)
6. [磁盘与存储](#6-磁盘与存储)
7. [用户、权限与共享](#7-用户权限与共享)
8. [环境变量与系统设置](#8-环境变量与系统设置)
9. [批处理脚本常用语法](#9-批处理脚本常用语法)
10. [高频实用组合示例](#10-高频实用组合示例)
11. [常用快捷命令表](#11-常用快捷命令表)

---

## 1. 文件与目录操作

### 目录切换与查看

| 命令 | 说明 | 示例 |
| --- | --- | --- |
| `cd` / `chdir` | 切换目录 | `cd D:\projects` |
| `cd /d` | 跨盘符切换 | `cd /d E:\data` |
| `cd ..` | 返回上一级 | `cd ..\..` 返回上两级 |
| `cd` | 不带参数显示当前路径 | `cd` |
| `dir` | 列出目录内容 | `dir /a` 含隐藏文件 |
| `dir /s` | 递归列出所有子目录 | `dir /s /b *.log` |
| `dir /b` | 精简模式（仅文件名） | `dir /b` |
| `tree` | 树形展示目录结构 | `tree /f` 含文件名 |
| `pushd` / `popd` | 保存/恢复当前目录 | `pushd D:\temp` … `popd` |

**dir 常用参数**

```
dir /a      显示所有文件（含隐藏、系统文件）
dir /a:h    只显示隐藏文件
dir /s      递归子目录
dir /b      简洁格式，只输出名称
dir /o:n    按名称排序
dir /o:s    按大小排序
dir /o:d    按日期排序
dir /t:w    按修改时间显示
dir /p      分页显示
```

### 创建与删除

| 命令 | 说明 | 示例 |
| --- | --- | --- |
| `mkdir` / `md` | 创建目录（自动建多级） | `mkdir D:\a\b\c` |
| `rmdir` / `rd` | 删除空目录 | `rd D:\empty` |
| `rd /s /q` | 递归强制删除目录（**不可恢复**） | `rd /s /q D:\temp\cache` |
| `del` | 删除文件 | `del test.txt` |
| `del /f /s /q` | 强制递归静默删除文件 | `del /f /s /q *.tmp` |
| `del /a:h` | 删除隐藏文件 | `del /a:h secret.txt` |
| `erase` | `del` 的别名 | `erase *.log` |

> ⚠️ CMD 的 `del` / `rd` **不进回收站**，删除前务必确认路径。

### 复制与移动

| 命令 | 说明 | 示例 |
| --- | --- | --- |
| `copy` | 复制文件（不支持目录） | `copy a.txt D:\bak\` |
| `copy /b a+b c` | 合并文件 | `copy /b 1.mp3+2.mp3 out.mp3` |
| `xcopy` | 复制文件/目录 | `xcopy src dst /E /I /H /Y` |
| `robocopy` | 强大复制（推荐，支持镜像同步） | `robocopy src dst /MIR` |
| `move` | 移动文件/重命名 | `move a.txt D:\bak\` |
| `ren` / `rename` | 重命名 | `ren old.txt new.txt` |

**xcopy 常用参数**

```
/E   复制所有子目录（含空目录）
/I   目标不存在时按目录处理
/H   复制隐藏和系统文件
/Y   覆盖时不提示
/S   复制子目录（不含空目录）
/D:2024-01-01  仅复制该日期之后修改的文件
/EXCLUDE:list.txt  排除清单中的文件
```

**robocopy 常用参数**（生产环境首选）

```
robocopy C:\src D:\dst /E        复制所有子目录
robocopy C:\src D:\dst /MIR      镜像同步（会删除目标多余文件，慎用）
robocopy C:\src D:\dst /E /XO    仅复制较新的文件
robocopy C:\src D:\dst /E /MT:16 16 线程加速
robocopy C:\src D:\dst /E /LOG:copy.log  输出日志
```

### 链接与属性

| 命令 | 说明 | 示例 |
| --- | --- | --- |
| `mklink /D 链接 目标` | 创建目录符号链接（需管理员） | `mklink /D D:\link D:\real` |
| `mklink /H` | 创建硬链接 | `mklink /H a.txt b.txt` |
| `mklink /J` | 创建目录联接（junction） | `mklink /J C:\link D:\real` |
| `attrib` | 查看/修改文件属性 | `attrib +h +s file.txt` |
| `attrib -r -h -s` | 去掉只读/隐藏/系统属性 | `attrib -r -h -s /s /d` |

---

## 2. 文件内容查看与处理

| 命令 | 说明 | 示例 |
| --- | --- | --- |
| `type` | 显示文本文件内容 | `type readme.txt` |
| `more` | 分页查看 | `type big.txt \| more` |
| `find` | 查找字符串（简单） | `find /i "error" app.log` |
| `findstr` | 正则查找（推荐） | `findstr /s /i /n "error" *.log` |
| `sort` | 排序 | `sort /r names.txt` |
| `fc` | 比较两个文件差异 | `fc a.txt b.txt` |
| `comp` | 逐字节比较 | `comp a.bin b.bin` |
| `certutil -hashfile` | 计算文件哈希 | 见下 |

**findstr 常用参数**

```
/s   递归子目录
/i   忽略大小写
/n   显示行号
/v   显示不匹配的行
/c:"字符串"  按整体字符串匹配（含空格）
/r   使用正则
```

```bat
:: 递归查找所有 .log 中包含 "ERROR" 的行，并显示行号
findstr /s /i /n "ERROR" *.log

:: 正则：查找以 2024 开头的行
findstr /r "^2024" data.txt
```

**计算文件校验值**

```bat
certutil -hashfile setup.exe MD5
certutil -hashfile setup.exe SHA256
```

**生成文件树清单**

```bat
tree /f > tree.txt
dir /s /b > allfiles.txt
```

---

## 3. 系统信息与诊断

| 命令 | 说明 |
| --- | --- |
| `systeminfo` | 系统详细信息（版本、补丁、内存） |
| `ver` | 显示 Windows 版本号 |
| `hostname` | 计算机名 |
| `whoami` | 当前登录用户 |
| `whoami /groups` | 当前用户所属组 |
| `date /t` | 当前日期 |
| `time /t` | 当前时间 |
| `wmic os get caption,version` | 系统名称与版本 |
| `wmic cpu get name` | CPU 型号 |
| `wmic memorychip get capacity` | 内存条容量 |
| `wmic diskdrive get model,size` | 硬盘型号与容量 |
| `driverquery` | 已安装驱动列表 |
| `tasklist` | 运行中的进程 |
| `set` | 查看所有环境变量 |
| `set path` | 查看 PATH |
| `fc /?` | 帮助 |

```bat
:: 常用信息速查
systeminfo | findstr /C:"OS 名称" /C:"OS 版本" /C:"系统类型"
wmic logicaldisk get caption,freespace,size
```

> 注：`wmic` 在新版 Windows 中已标记为弃用，可用 PowerShell 的 `Get-CimInstance` 替代，但 CMD 下 `wmic` 仍可正常使用。

---

## 4. 网络相关

### 连通性测试

| 命令 | 说明 | 示例 |
| --- | --- | --- |
| `ping` | 测试连通性 | `ping www.baidu.com -n 4` |
| `ping -t` | 持续 ping（Ctrl+C 停止） | `ping 8.8.8.8 -t` |
| `ping -l 1500` | 指定包大小（测 MTU） | `ping -f -l 1472 8.8.8.8` |
| `tracert` | 路由跟踪 | `tracert www.qq.com` |
| `pathping` | 结合 ping 与 tracert 的丢包统计 | `pathping www.baidu.com` |
| `telnet 主机 端口` | 测试端口（需先启用客户端） | `telnet 127.0.0.1 3306` |
| `curl` | HTTP 请求（Win10 1803+ 内置） | `curl -I https://www.baidu.com` |

### 网络配置

| 命令 | 说明 |
| --- | --- |
| `ipconfig` | 查看 IP 配置 |
| `ipconfig /all` | 详细信息（含 MAC、DNS、DHCP） |
| `ipconfig /flushdns` | 清空 DNS 缓存 |
| `ipconfig /release` | 释放 DHCP 地址 |
| `ipconfig /renew` | 重新获取 DHCP 地址 |
| `ipconfig /displaydns` | 查看 DNS 缓存 |
| `ipconfig /registerdns` | 重新注册 DNS |
| `getmac` | 查看网卡 MAC 地址 |
| `nslookup` | DNS 查询 | 
| `route print` | 查看路由表 |
| `route add` | 添加静态路由 |
| `arp -a` | 查看 ARP 缓存 |
| `netstat -ano` | 端口与连接（含 PID） |
| `netsh` | 网络配置综合工具 |

```bat
:: 查看 8080 端口被哪个进程占用
netstat -ano | findstr :8080

:: 查出 PID 对应的程序名
tasklist | findstr 12345

:: 清理 DNS 缓存（网络异常首选）
ipconfig /flushdns

:: 重置 Winsock（网络严重异常时使用，需管理员 + 重启）
netsh winsock reset
```

**nslookup 用法**

```bat
nslookup www.baidu.com
nslookup www.baidu.com 8.8.8.8        :: 指定 DNS 服务器
nslookup -type=mx qq.com              :: 查询 MX 记录
```

**netsh 常用操作**（多数需管理员）

```bat
:: 查看 WiFi 配置与密码
netsh wlan show profiles
netsh wlan show profile name="WiFi名" key=clear

:: 设置静态 IP
netsh interface ip set address "以太网" static 192.168.1.100 255.255.255.0 192.168.1.1

:: 切回 DHCP
netsh interface ip set address "以太网" dhcp

:: 设置 DNS
netsh interface ip set dns "以太网" static 223.5.5.5

:: 导出/导入防火墙规则
netsh advfirewall export "D:\fw.wfw"
netsh advfirewall import "D:\fw.wfw"

:: 防火墙开关
netsh advfirewall set allprofiles state off
```

**远程连接**

```bat
mstsc                        :: 打开远程桌面
mstsc /v:192.168.1.10        :: 直连指定主机
ssh user@192.168.1.10        :: Win10+ 内置 OpenSSH 客户端
ftp                          :: FTP 客户端
```

---

## 5. 进程与服务管理

### 进程

| 命令 | 说明 |
| --- | --- |
| `tasklist` | 列出进程 |
| `tasklist /fi "imagename eq chrome.exe"` | 按名称过滤 |
| `taskkill /im notepad.exe` | 按名称结束进程 |
| `taskkill /pid 1234` | 按 PID 结束 |
| `taskkill /f /t /pid 1234` | 强制结束含子进程 |
| `start "" 程序` | 新窗口启动程序 |
| `start 文件` | 用默认程序打开文件 |

```bat
:: 找出占内存最高的进程
wmic process get name,workingsetsize | sort /r

:: 一键结束所有 Chrome
taskkill /f /im chrome.exe
```

### 服务

| 命令 | 说明 |
| --- | --- |
| `sc query 服务名` | 查询服务状态 |
| `sc start 服务名` | 启动服务 |
| `sc stop 服务名` | 停止服务 |
| `sc config 服务名 start= auto` | 设为自动启动（等号后必须有空格） |
| `sc config 服务名 start= disabled` | 禁用服务 |
| `net start` | 列出运行中的服务 |
| `net start 服务名` | 启动服务 |
| `net stop 服务名` | 停止服务 |
| `service.msc` | 图形化服务管理器（在运行框执行） |

```bat
sc query mysql
sc stop mysql
sc config mysql start= demand    :: 手动启动
```

---

## 6. 磁盘与存储

| 命令 | 说明 | 示例 |
| --- | --- | --- |
| `chkdsk` | 检查磁盘 | `chkdsk C: /f /r` |
| `chkdsk /f` | 修复错误（需重启） | `chkdsk D: /f` |
| `chkdsk /r` | 定位坏道并恢复可读信息 | `chkdsk C: /r` |
| `format` | 格式化（**危险**） | `format E: /fs:ntfs /q` |
| `diskpart` | 分区管理（**危险**） | 交互式，见下 |
| `defrag` | 碎片整理 | `defrag C: /O` |
| `cleanmgr` | 磁盘清理（图形） | `cleanmgr /sagerun:1` |
| `compact` | NTFS 压缩 | `compact /c /s:D:\data` |

```bat
:: 磁盘空间一览
wmic logicaldisk get caption,volumename,freespace,size

:: diskpart 交互命令示例（进入后依次输入）
:: list disk          → 列出磁盘
:: select disk 1      → 选择磁盘
:: list partition     → 列出分区
:: clean              → 清空磁盘所有分区（不可恢复！）
:: create partition primary
:: format fs=ntfs quick
:: assign letter=E
```

> ⚠️ `format`、`diskpart clean` 会**彻底销毁数据**，操作前必须二次确认盘符。

---

## 7. 用户、权限与共享

| 命令 | 说明 | 示例 |
| --- | --- | --- |
| `net user` | 列出本地用户 | `net user` |
| `net user 用户名` | 查看用户详情 | `net user admin` |
| `net user 用户名 密码 /add` | 新建用户 | `net user test 123456 /add` |
| `net user 用户名 /delete` | 删除用户 | `net user test /delete` |
| `net user 用户名 新密码` | 改密码 | `net user admin Pass@123` |
| `net localgroup` | 列出本地组 | `net localgroup` |
| `net localgroup administrators 用户 /add` | 加入管理员组 | `net localgroup administrators test /add` |
| `net share` | 查看共享 | `net share` |
| `net share 名=路径 /grant:用户,full` | 创建共享 | `net share data=D:\data /grant:everyone,full` |
| `net share 名 /delete` | 删除共享 | `net share data /delete` |
| `net use Z: \\主机\共享` | 映射网络驱动器 | `net use Z: \\192.168.1.5\share` |
| `net use Z: /delete` | 断开映射 | `net use Z: /delete` |
| `net view \\主机` | 查看主机共享列表 | `net view \\192.168.1.5` |
| `icacls` | 查看/设置文件 ACL | `icacls D:\data /grant test:(OI)(CI)F` |
| `takeown` | 夺取文件所有权 | `takeown /f file.txt /a` |
| `runas /user:管理员 cmd` | 以其他用户身份运行 | `runas /user:admin cmd` |

```bat
:: 查看某目录的权限
icacls D:\data

:: 授予 test 用户完全控制（含子目录继承）
icacls D:\data /grant test:(OI)(CI)F /t
```

---

## 8. 环境变量与系统设置

| 命令 | 说明 |
| --- | --- |
| `set` | 列出所有环境变量 |
| `set 变量名` | 查看单个变量 |
| `set 变量名=值` | 设置临时变量（仅当前窗口） |
| `setx 变量名 值` | 永久设置用户变量 |
| `setx 变量名 值 /m` | 永久设置系统变量（需管理员） |
| `path` | 查看 PATH |
| `echo %PATH%` | 展开变量 |
| `setx PATH "%PATH%;C:\tools"` | 追加 PATH（注意长度限制） |

```bat
set JAVA_HOME
setx JAVA_HOME "C:\Program Files\Java\jdk-17" /m
```

**系统设置工具（在"运行"或 CMD 中直接执行）**

| 命令 | 打开 |
| --- | --- |
| `control` | 控制面板 |
| `appwiz.cpl` | 程序和功能（卸载软件） |
| `ncpa.cpl` | 网络连接 |
| `devmgmt.msc` | 设备管理器 |
| `diskmgmt.msc` | 磁盘管理 |
| `services.msc` | 服务管理器 |
| `secpol.msc` | 本地安全策略 |
| `gpedit.msc` | 组策略编辑器（家庭版无） |
| `regedit` | 注册表编辑器 |
| `msconfig` | 系统配置（启动项） |
| `taskmgr` | 任务管理器 |
| `eventvwr.msc` | 事件查看器 |
| `compmgmt.msc` | 计算机管理 |
| `explorer .` | 用资源管理器打开当前目录 |

---

## 9. 批处理脚本常用语法

### 基础结构

```bat
@echo off                 :: 关闭命令回显
setlocal enabledelayedexpansion  :: 启用延迟变量展开

chcp 65001                :: 切换 UTF-8 代码页，避免中文乱码

echo Hello World
echo.                     :: 输出空行
:: 这是注释（行内注释用 &:: 或 rem）
rem 这也是注释

pause                     :: 暂停等待按键
exit /b 0                 :: 退出脚本并返回错误码
```

### 变量与参数

```bat
set NAME=World
echo %NAME%

:: 脚本参数：%1 %2 ... %*，%0 为脚本本身
echo 第一个参数：%1
echo 全部参数：%*

:: 用户输入
set /p INPUT=请输入内容：
echo 你输入了 %INPUT%

:: 计算
set /a SUM=1+2*3
echo %SUM%
```

### 条件判断

```bat
if exist "D:\data" (echo 目录存在) else (echo 目录不存在)
if not exist "file.txt" echo 文件缺失

if "%1"=="" echo 未传参数

:: 数值比较：EQU NEQ LSS LEQ GTR GEQ
if %ERRORLEVEL% NEQ 0 echo 上一条命令失败

:: 文件比较
if "a.txt"=="b.txt" echo same
```

### 循环

```bat
:: 遍历文件
for %%f in (*.txt) do echo 处理 %%f

:: 遍历目录（/d 目录 /r 递归 /l 数字序列）
for /d %%d in (*) do echo 子目录：%%d
for /r D:\data %%f in (*.log) do echo %%f
for /l %%i in (1,1,10) do echo 第 %%i 次

:: 解析命令输出（/f）
for /f "tokens=1,2 delims=," %%a in (data.csv) do echo %%a - %%b

:: 解析命令结果
for /f "delims=" %%i in ('dir /b *.txt') do echo %%i
```

> 批处理文件中用 `%%f`；**在命令行直接执行时用 `%f`**。

### 重定向与管道

| 符号 | 说明 |
| --- | --- |
| `>` | 覆盖输出到文件 |
| `>>` | 追加输出到文件 |
| `<` | 从文件读取输入 |
| `2>` | 重定向错误输出 |
| `2>&1` | 错误输出合并到标准输出 |
| `>nul` | 丢弃输出 |
| `\|` | 管道，把前者输出交给后者 |
| `&&` | 前者成功才执行后者 |
| `\|\|` | 前者失败才执行后者 |
| `&` | 顺序执行两者 |

```bat
dir > list.txt 2>&1            :: 输出与错误一起写入
command >nul 2>&1              :: 完全静默
ipconfig | findstr IPv4
```

### 其他有用命令

| 命令 | 说明 |
| --- | --- |
| `cls` | 清屏 |
| `title 名称` | 设置窗口标题 |
| `color 0A` | 设置前景/背景色（0A = 黑底绿字） |
| `timeout /t 5 /nobreak` | 等待 5 秒 |
| `choice /c yn /t 10 /d y` | 选择菜单 |
| `call 脚本.bat` | 调用另一个批处理 |
| `shift` | 参数左移 |
| `assoc` / `ftype` | 查看/修改文件关联 |
| `where 命令` | 查找命令所在路径 |
| `clip` | 把输出复制到剪贴板 |

```bat
echo 已复制到剪贴板 | clip
```

---

## 10. 高频实用组合示例

```bat
:: ① 清理临时文件（管理员）
del /f /s /q "%TEMP%\*.*"
del /f /s /q "C:\Windows\Temp\*.*"

:: ② 备份目录到另一块盘（带日志）
robocopy "D:\work" "E:\backup\work" /E /XO /R:2 /W:2 /LOG+:E:\backup\work.log

:: ③ 打包当天修改过的文件列表
forfiles /p "D:\logs" /d 0 /c "cmd /c echo @path" > today.txt

:: ④ 按时间戳生成备份文件名
set STAMP=%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%
set STAMP=%STAMP: =0%
copy data.db "D:\bak\data_%STAMP%.db"

:: ⑤ 批量重命名（加前缀）
for %%f in (*.jpg) do ren "%%f" "IMG_%%f"

:: ⑥ 检测网络是否通，不通则记录
ping -n 1 192.168.1.1 >nul && echo 在线 >> net.log || echo 离线 >> net.log

:: ⑦ 查看开机自启动项
wmic startup get caption,command

:: ⑧ 查找大文件（大于 100MB）
forfiles /p "D:\" /s /m *.* /c "cmd /c if @fsize gtr 104857600 echo @path @fsize"
```

> 关于 `%date%` / `%time%`：格式受系统区域设置影响，跨机器使用前先 `echo %date%` 确认。更稳妥的做法是在 PowerShell 中用 `Get-Date -Format`。

---

## 11. 常用快捷命令表

| 命令 | 作用 |
| --- | --- |
| `cls` | 清屏 |
| `help` | 列出内置命令 |
| `help 命令` | 查看命令帮助（等同 `命令 /?`） |
| `doskey /history` | 查看本次会话命令历史 |
| `↑ / ↓` | 浏览历史命令 |
| `Tab` | 自动补全文件名/路径 |
| `F7` | 弹出历史命令选择框 |
| `Ctrl+C` | 中断当前命令 |
| `exit` | 关闭 CMD 窗口 |

### 以管理员身份运行的两种方式

```bat
:: 方式一：右键"以管理员身份运行"
:: 方式二：在普通 CMD 中提权执行单条命令（会弹 UAC）
powershell -Command "Start-Process cmd -ArgumentList '/k 你的命令' -Verb RunAs"
```

---

## 附录：易混淆点速记

| 容易出错 | 正确写法 |
| --- | --- |
| `cd D:\data` 后仍在原盘 | `cd /d D:\data` |
| `sc config 服务 start=auto` | `start= auto`（等号后必须有空格） |
| 批处理里写 `for %f in` | 批处理中必须 `%%f` |
| 路径含空格没加引号 | `cd "C:\Program Files"` |
| 删除目录用 `del` | 用 `rd /s /q` |
| 中文乱码 | 脚本开头 `chcp 65001` 并另存为 UTF-8 |

---

*文档整理：Windows CMD 常用命令速查 · 建议配合 `命令 /?` 深入查阅*
