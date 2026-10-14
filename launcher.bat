@echo off
cd /d "%~dp0"

title Serenity SR-HW03 Launcher

echo ==================================
echo  Serenity SR-HW03 Launcher
echo ==================================

where node >nul 2>&1

if errorlevel 1 (
    echo [ERROR] Node.js belum terpasang.
    echo Silakan install Node.js versi 22 atau yang kompatibel.
    echo Panduan: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js terdeteksi:
node --version

if not exist "node_modules\" (
    echo [ERROR] Dependency belum terpasang.
    echo Jalankan: npm install
    pause
    exit /b 1
)

echo [INFO] Menjalankan aplikasi...
node index.js

pause