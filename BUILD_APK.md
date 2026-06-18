# Guide pour créer l'APK de Bourse Game

## Méthode 1: Utiliser PWABuilder (Recommandé)

### Étape 1: Préparer les fichiers
Assurez-vous d'avoir tous ces fichiers dans le même dossier:
- index.html
- style.css
- game.js
- manifest.json
- sw.js
- icon.png (icône 512x512)

### Étape 2: Télécharger l'icône
Téléchargez l'icône depuis:
https://cdn-icons-png.flaticon.com/512/1753/1753732.png

Renommez-la en `icon.png` et placez-la dans le dossier.

### Étape 3: Utiliser PWABuilder
1. Allez sur https://www.pwabuilder.com/
2. Entrez l'URL de votre site (ou utilisez le mode local)
3. Cliquez sur "Start" pour analyser votre PWA
4. Sélectionnez "Android" comme plateforme
5. Cliquez sur "Build my PWA"
6. Téléchargez le fichier APK généré

## Méthode 2: Utiliser Cordova/PhoneGap

### Installation
```bash
npm install -g cordova
```

### Créer le projet
```bash
cordova create BourseGame com.boursegame.game "Bourse Game"
cd BourseGame
cordova platform add android
```

### Copier les fichiers
Copiez tous les fichiers du jeu dans le dossier `www/`:
- index.html
- style.css
- game.js
- manifest.json
- sw.js
- icon.png

### Configurer config.xml
```xml
<?xml version='1.0' encoding='utf-8'?>
<widget id="com.boursegame.game" version="1.0.0"
    xmlns="http://www.w3.org/ns/widgets"
    xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>Bourse Game</name>
    <description>Jeu de bourse virtuel</description>
    <author email="votre@email.com">Votre Nom</author>
    <content src="index.html" />
    <access origin="*" />
    <allow-intent href="http://*/*" />
    <allow-intent href="https://*/*" />
    <icon src="icon.png" />
    <splash src="icon.png" />
    <preference name="Orientation" value="portrait" />
    <preference name="Fullscreen" value="false" />
</widget>
```

### Build l'APK
```bash
cordova build android
```

L'APK sera générée dans: `platforms/android/app/build/outputs/apk/debug/app-debug.apk`

## Méthode 3: Utiliser Bubblewrap (Google)

### Installation
```bash
npm install -g @nicknisi/bubblewrap
```

### Initialiser
```bash
bubblewrap init --manifest=manifest.json
```

### Build
```bash
bubblewrap build
```

## Méthode 4: Utiliser Android Studio

1. Ouvrez Android Studio
2. Créez un nouveau projet "Empty Activity"
3. Remplacez le contenu de `app/src/main/assets/` par vos fichiers
4. Configurez l'icône dans `res/mipmap-*`
5. Build > Build APK

## Fichiers requis pour l'APK

### manifest.json (déjà créé)
Contient les métadonnées de l'application.

### sw.js (déjà créé)
Service worker pour le mode hors-ligne.

### icon.png (à télécharger)
Téléchargez depuis: https://cdn-icons-png.flaticon.com/512/1753/1753732.png
Renommez en `icon.png` (512x512 pixels minimum)

## Notes importantes

1. **Testez d'abord en PWA**: Ouvrez le jeu dans Chrome, vérifiez qu'il fonctionne en mode "Add to Home Screen"

2. **HTTPS requis**: Pour que le PWA fonctionne, vous devez héberger les fichiers sur HTTPS (ou localhost pour les tests)

3. **Permissions Android**: Le jeu ne nécessite aucune permission spéciale

4. **Taille de l'APK**: Environ 2-3 MB avec toutes les fonctionnalités

## Publication sur Google Play Store

1. Créez un compte développeur Google Play (25$)
2. Préparez les captures d'écran et la description
3. Générez un APK signé (release)
4. Uploadez sur Google Play Console

## Support

Pour toute question sur la conversion en APK, consultez:
- https://developer.mozilla.org/fr/docs/Web/Progressive_web_apps
- https://cordova.apache.org/
- https://www.pwabuilder.com/