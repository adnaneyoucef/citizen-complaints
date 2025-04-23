# Frontend - Gestion des réclamations citoyennes

## Stack
- React
- Axios
- Material-UI (optionnel)

## Démarrage
1. Installer les dépendances : `npm install`
2. Lancer l'application : `npm start`
3. L'app est accessible sur `http://localhost:3000`

## Configuration de l'API
- Par défaut, les appels API pointent vers `http://localhost:5000` (backend local)
- Pour déploiement, modifiez l'URL de l'API dans le code (ex: `.env` ou directement dans les fichiers Axios) pour pointer vers l'URL Render du backend

## Déploiement Netlify
1. Générer le build : `npm run build`
2. Uploadez le dossier `build/` sur https://app.netlify.com/ (drag & drop ou GitHub)
3. Configurez l'URL de l'API pour pointer vers le backend public

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
