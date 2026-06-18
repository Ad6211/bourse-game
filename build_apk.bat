@echo off
echo ============================================
echo   Bourse Game - Build APK Script
echo ============================================
echo.

echo Verifying files...
if not exist index.html (
    echo ERREUR: index.html manquant!
    pause
    exit /b 1
)
if not exist style.css (
    echo ERREUR: style.css manquant!
    pause
    exit /b 1
)
if not exist game.js (
    echo ERREUR: game.js manquant!
    pause
    exit /b 1
)
if not exist manifest.json (
    echo ERREUR: manifest.json manquant!
    pause
    exit /b 1
)
if not exist sw.js (
    echo ERREUR: sw.js manquant!
    pause
    exit /b 1
)
if not exist icon.png (
    echo ERREUR: icon.png manquant!
    pause
    exit /b 1
)

echo Tous les fichiers sont presents!
echo.
echo ============================================
echo   Methode 1: PWABuilder (RECOMMANDE)
echo ============================================
echo.
echo 1. Ouvrez votre navigateur
echo 2. Allez sur: https://www.pwabuilder.com/
echo 3. Cliquez sur "Start"
echo 4. Entrez l'URL de votre site ou uploadez les fichiers
echo 5. Selectionnez "Android"
echo 6. Cliquez sur "Build my PWA"
echo 7. Telechargez l'APK
echo.
echo ============================================
echo   Methode 2: Cordova (si installe)
echo ============================================
echo.
echo Si vous avez Cordova installe, executez:
echo.
echo   npm install -g cordova
echo   cordova create BourseGame com.boursegame.game "Bourse Game"
echo   cd BourseGame
echo   cordova platform add android
echo   copy index.html platforms\android\app\src\main\assets\www\
echo   copy style.css platforms\android\app\src\main\assets\www\
echo   copy game.js platforms\android\app\src\main\assets\www\
echo   copy manifest.json platforms\android\app\src\main\assets\www\
echo   copy sw.js platforms\android\app\src\main\assets\www\
echo   copy icon.png platforms\android\app\src\main\assets\www\
echo   cordova build android
echo.
echo ============================================
echo   Fichiers prets pour l'APK
echo ============================================
echo.
echo Tous les fichiers necessaires sont dans ce dossier:
echo   - index.html
echo   - style.css
echo   - game.js
echo   - manifest.json
echo   - sw.js
echo   - icon.png
echo   - BUILD_APK.md (guide detaille)
echo.
echo Pour creer l'APK, utilisez PWABuilder:
echo https://www.pwabuilder.com/
echo.
pause