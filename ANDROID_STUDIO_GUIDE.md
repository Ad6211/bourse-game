# 📱 Compiler l'APK avec Android Studio

## Étape 1: Ouvrir le projet
1. Lancez **Android Studio**
2. Cliquez sur **"Open"** (Ouvrir)
3. Naviguez vers: `c:\Users\adamj\git\bourse game\BourseGame`
4. Sélectionnez le dossier **BourseGame**
5. Cliquez **OK**

## Étape 2: Attendre la synchronisation
- Android Studio va synchroniser le projet Gradle
- Cela peut prendre 2-5 minutes la première fois
- Téléchargera automatiquement les dépendances

## Étape 3: Vérifier la configuration
1. Allez dans **File → Project Structure**
2. Vérifiez:
   - **SDK Location**: Chemin Android SDK
   - **Project SDK**: Android API 36 (ou plus récent)
   - **Build Tools**: 36.0.0 ou plus récent

## Étape 4: Build l'APK
1. Allez dans **Build → Build Bundle(s) / APK(s) → Build APK(s)**
2. Attendez la compilation (2-3 minutes)
3. Cliquez sur **"locate"** quand c'est terminé

## Étape 5: Trouver l'APK
L'APK sera dans:
```
BourseGame\platforms\android\app\build\outputs\apk\debug\app-debug.apk
```

## Étape 6: Installer sur votre téléphone
1. Transférez l'APK sur votre téléphone Android
2. Ouvrez le fichier APK
3. Autorisez l'installation de sources inconnues
4. Installez l'application

## Résultat
- ✅ Icône "Bourse Game" sur votre écran d'accueil
- ✅ Fonctionne hors-ligne
- ✅ Mode standalone (pas de barre d'adresse)
- ✅ Compatible Android 5+

## Dépannage

### Erreur "SDK not found"
- Allez dans **File → Settings → Appearance & Behavior → System Settings → Android SDK**
- Installez Android SDK Platform 36
- Installez Android SDK Build-Tools 36

### Erreur de compilation
- Allez dans **File → Sync Project with Gradle Files**
- Redémarrez Android Studio

### L'APK ne s'installe pas
- Activez "Sources inconnues" dans Paramètres Android
- Ou utilisez **adb install**:
  ```bash
  adb install BourseGame\platforms\android\app\build\outputs\apk\debug\app-debug.apk
  ```

## C'est tout !
Votre APK est prête à être utilisée. 🎉