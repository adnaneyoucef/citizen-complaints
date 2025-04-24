# Frontend - Gestion des réclamations citoyennes

## Installation de Node.js (Windows)

(Si ce n'est pas déjà fait, voir les instructions dans le README global.)

## Stack
- React
- Axios
- Material-UI (optionnel)

## Démarrage rapide (démo)

**Pour lancer le projet sur un nouvel ordinateur :**

1. Clonez ce dépôt (`git clone ...`).
2. Ouvrez un terminal à la racine du projet.
3. Exécutez : `start-demo-full.bat`
   - Le script installe toutes les dépendances (backend & frontend), lance les serveurs, et prépare tout automatiquement.
   - L'application sera accessible sur [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## Démarrage manuel (avancé)

1. Naviguer dans le dossier `frontend` :
   ```sh
   cd frontend
   ```
2. Installer les dépendances :
   ```sh
   npm install
   ```
3. Lancer l'application :
   ```sh
   npm run start
   ```
4. L'app est accessible sur [http://localhost:3000](http://localhost:3000)

## Configuration de l'API
- Par défaut, les appels API pointent vers `http://localhost:5000` (backend local)
- Pour déploiement, modifiez l'URL de l'API dans le code (ex: `.env` ou directement dans les fichiers Axios) pour pointer vers l'URL la nouvelle URL du backend

## Fonctionnalités principales
- Soumission de réclamation (citoyen)
- Connexion admin
- Gestion et suivi des réclamations (admin)
- Téléchargement des pièces jointes (admin)

## À venir
- Notifications email
- Statistiques et rapports

## Description
واجهة ويب تتيح للمواطنين إرسال الشكاوى دون تسجيل دخول، وتوفر لوحة تحكم خاصة للمسؤول (الإدارة) لتتبع ومعالجة الشكاوى.

## Structure
- صفحة إرسال الشكوى (مفتوحة للجميع)
- صفحة دخول المسؤول
- لوحة تحكم المسؤول (إدارة الشكاوى)

## Prerequisites
- Node.js
- npm

## Démarrage
1. تثبيت الحزم: `npm install`
2. تشغيل التطبيق: `npm start`

واجهة المستخدم باللغة العربية وباتجاه من اليمين إلى اليسار (RTL).
