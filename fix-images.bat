@echo off
REM Fix Images Not Displaying Issue
REM This script clears all caches and rebuilds the app

echo.
echo 🔧 Fixing Image Display Issues
echo ==============================
echo.

echo 📱 Step 1: Uninstalling app from device...
adb uninstall com.omkar.firstproject
echo.

echo 🧹 Step 2: Cleaning Android build...
cd android
call gradlew clean
cd ..
echo.

echo 🗑️ Step 3: Clearing Metro cache...
echo This will start Metro bundler with reset cache...
echo.

echo 📦 Step 4: Starting Metro bundler...
start "Metro Bundler" cmd /k "npm start -- --reset-cache"
echo.

echo ⏳ Waiting 10 seconds for Metro to start...
timeout /t 10 /nobreak
echo.

echo 🔨 Step 5: Building and installing app...
call npm run android
echo.

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Build successful!
    echo.
    echo 📱 Check your device - images should now display correctly
    echo.
) else (
    echo.
    echo ❌ Build failed. Try these steps manually:
    echo.
    echo 1. Close Metro bundler
    echo 2. Run: npm start -- --reset-cache
    echo 3. In another terminal: npm run android
    echo.
)

echo.
pause
