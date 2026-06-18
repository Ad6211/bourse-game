# 🔧 Dépannage - Android Studio ne compile pas

## Problème
```
ANDROID_HOME=undefined
ANDROID_SDK_ROOT=undefined
Failed to find 'JAVA_HOME' environment variable
```

## Solution 1: Configurer Android Studio (Recommandé)

### Étape 1: Ouvrir le projet dans Android Studio
1. Lancez **Android Studio**
2. **File → Open** → Sélectionnez `c:\Users\adamj\git\bourse game\BourseGame`
3. Attendez la synchronisation Gradle

### Étape 2: Installer les composants manquants
Android Studio va vous proposer d'installer:
- **Android SDK Platform 36**
- **Android SDK Build-Tools 36**
- **Java JDK 17** (ou 11)

Cliquez sur **"Install"** pour chaque composant.

### Étape 3: Configurer le SDK
1. **File → Project Structure** (ou Ctrl+Alt+Shift+S)
2. **SDK Location** (gauche)
3. Vérifiez:
   - **Android SDK location**: `C:\Users\adamj\AppData\Local\Android\Sdk`
   - **JDK location**: `C:\Program Files\Android\Android Studio\jbr-17` (ou jdk-17)

### Étape 4: Synchroniser
1. **File → Sync Project with Gradle Files** (icône éléphant)
2. Attendez la fin de la synchronisation

### Étape 5: Builder
1. **Build → Build Bundle(s) / APK(s) → Build APK(s)**
2. Attendez 2-3 minutes
3. Cliquez sur **"locate"** quand c'est terminé

## Solution 2: Utiliser la ligne de commande (Si Android Studio bloque)

### Étape 1: Ouvrir PowerShell dans le dossier
```powershell
cd "c:\Users\adamj\git\bourse game\BourseGame"
```

### Étape 2: Configurer les variables d'environnement
```powershell
# Trouver le chemin du SDK Android
$env:ANDROID_HOME = "C:\Users\adamj\AppData\Local\Android\Sdk"
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr-17"

# Ajouter au PATH
$env:PATH += ";$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\tools;$env:JAVA_HOME\bin"
```

### Étape 3: Builder
```powershell
cordova build android
```

## Solution 3: Si vous n'avez pas Android SDK installé

### Option A: Installer via Android Studio
1. Ouvrez Android Studio
2. **More Actions → SDK Manager**
3. Cochez:
   - Android SDK Platform 36
   - Android SDK Build-Tools 36
   - Intel x86 Atom_64 System Image (pour émulateur)
4. Cliquez **Apply**

### Option B: Installer ligne de commande
```powershell
# Télécharger les outils
# Allez sur: https://developer.android.com/studio#command-tools
# Téléchargez "Command line tools only" pour Windows
```

## Vérification

### Vérifier Java
```powershell
java -version
```
Doit afficher: `java version "17.0.x"` ou `"11.0.x"`

### Vérifier Android SDK
```powershell
adb version
```
Doit afficher la version d'ADB

### Vérifier les variables d'environnement
```powershell
echo $env:ANDROID_HOME
echo $env:JAVA_HOME
```
Ne doivent pas être `undefined`

## Erreurs courantes

### "SDK not found"
→ Allez dans **File → Project Structure → SDK Location**
→ Définissez le chemin manuellement

### "Gradle sync failed"
→ **File → Invalidate Caches / Restart**
→ Choisissez "Invalidate and Restart"

### "Build tools missing"
→ **Tools → SDK Manager → SDK Tools**
→ Cochez "Android SDK Build-Tools 36"

### "Permission denied"
→ Exécutez Android Studio en **mode administrateur**
→ Clic droit → "Run as administrator"

## Alternative: PWABuilder (Sans Android Studio)

Si Android Studio pose problème, utilisez PWABuilder:

1. **Hébergez** sur Netlify: https://app.netlify.com/drop
2. **Générez APK**: https://www.pwabuilder.com/
3. **Téléchargez** l'APK directement

C'est plus simple et fonctionne à 100% !

## C'est tout !
Après configuration, le build devrait fonctionner.
L'APK sera dans: `BourseGame\platforms\android\app\build\outputs\apk\debug\app-debug.apk`