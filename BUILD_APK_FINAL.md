# 🚀 Builder l'APK - Méthode la plus simple

## Le problème
Android Studio n'a pas Java JDK et Android SDK installés.

## La solution (3 étapes simples)

### Étape 1: Ouvrir Android Studio
1. Lancez **Android Studio**
2. Au premier lancement, choisissez **"Open"** (pas "New Project")
3. Naviguez vers: `c:\Users\adamj\git\bourse game\BourseGame`
4. Sélectionnez le dossier **BourseGame**
5. Cliquez **OK**

### Étape 2: Laisser Android Studio installer automatiquement
Android Studio va détecter que des composants manquent et afficher une barre en haut:

```
Sync failed: Android SDK not found
[Install SDK Platform 36] [Install Build-Tools 36] [Install JDK 17]
```

**Cliquez sur tous les boutons "Install"** et attendez 5-10 minutes.

Android Studio va télécharger et installer:
- ✅ Android SDK Platform 36
- ✅ Android SDK Build-Tools 36
- ✅ Java JDK 17
- ✅ Gradle

### Étape 3: Builder l'APK
Une fois l'installation terminée:

1. **Attendez** que la barre de progression disparaisse
2. **File → Sync Project with Gradle Files** (icône éléphant)
3. **Build → Build Bundle(s) / APK(s) → Build APK(s)**
4. Attendez 2-3 minutes
5. Une notification apparaît: **"APK(s) generated successfully"**
6. Cliquez sur **"locate"** dans la notification

## Où trouver l'APK
```
BourseGame\platforms\android\app\build\outputs\apk\debug\app-debug.apk
```

## Installer sur votre téléphone
1. Transférez `app-debug.apk` sur votre téléphone Android
2. Ouvrez le fichier
3. Autorisez "Sources inconnues"
4. Installez

## C'est tout !
L'icône "Bourse Game" apparaît sur votre écran d'accueil. 🎉

## Si ça ne marche toujours pas

### Alternative: PWABuilder (100% fonctionnel)
1. Uploadez le dossier sur https://app.netlify.com/drop
2. Allez sur https://www.pwabuilder.com/
3. Entrez l'URL → Android → Build
4. Téléchargez l'APK

Cette méthode ne nécessite aucune installation et fonctionne à 100%.

## Notes importantes
- La première compilation prend 5-10 minutes (téléchargement des dépendances)
- Les compilations suivantes sont plus rapides (30 secondes)
- Gardez Android Studio ouvert pendant le build
- Ne fermez pas la fenêtre de progression