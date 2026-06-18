# 🚀 Créer l'APK SANS installer Android SDK

## Problème
La compilation d'APK avec Cordova nécessite:
- Java JDK (1+ GB)
- Android SDK (10+ GB)
- Configuration complexe

## Solution: PWABuilder (Aucune installation requise)

### Étape 1: Hébergement (2 minutes)
1. Allez sur https://app.netlify.com/drop
2. Glissez-déposez ce dossier:
   ```
   bourse game/
   ├── index.html
   ├── style.css
   ├── game.js
   ├── manifest.json
   ├── sw.js
   └── icon.png
   ```
3. Copiez l'URL (ex: https://abc123.netlify.app)

### Étape 2: Génération APK (2 minutes)
1. Allez sur https://www.pwabuilder.com/
2. Entrez votre URL Netlify
3. Cliquez "Start"
4. Sélectionnez "Android"
5. Cliquez "Build my PWA"
6. Téléchargez l'APK

### Étape 3: Installation
- Transférez l'APK sur votre téléphone
- Ouvrez et installez
- L'icône apparaît sur l'écran d'accueil

## C'est tout !
✅ Aucune installation nécessaire
✅ APK signée et prête
✅ Compatible Android 5+
✅ Fonctionne hors-ligne

## Alternative: GitHub Pages
1. Créez un repo GitHub
2. Uploadez les fichiers
3. Activez GitHub Pages
4. Utilisez l'URL avec PWABuilder

## Besoin d'aide ?
Le guide BUILD_APK.md contient toutes les méthodes.