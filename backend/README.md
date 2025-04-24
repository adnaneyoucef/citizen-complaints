# Backend - Gestion des réclamations citoyennes

## Installation de Node.js (Windows)

(Si ce n'est pas déjà fait, voir les instructions dans le README global.)

## Stack
- Node.js + Express
- NeDB (base locale, fichiers .db)
- Authentification JWT

## Structure
- `models/` : Modèles NeDB (User, Complaint)
- `routes/` : Routes API (utilisateurs, réclamations)
- `index.js` : Point d’entrée serveur

## Démarrage rapide (démo)

**Pour lancer le projet sur un nouvel ordinateur :**

1. Clonez ce dépôt (`git clone ...`).
2. Ouvrez un terminal dans le dossier du projet.
3. Exécutez : `start-demo-full.bat`
   - Ce script :
     - Crée automatiquement `backend/.env` si besoin (avec des valeurs par défaut).
     - Installe toutes les dépendances backend & frontend (`npm install`).
     - Crée un admin (si inexistant) via `scripts/create-admin.js`.
     - Démarre le backend (port 5000) et le frontend (port 3000).
   - Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour accéder à l’appli.

**Dépendances principales :**
- Node.js, npm
- [nodemailer](https://www.npmjs.com/package/nodemailer) (envoi d’e-mails)
- Voir `package.json` pour la liste complète.

---

## Démarrage manuel (avancé)

1. Naviguer dans le dossier `backend`:
   ```sh
   cd backend
   ```
2. Installer les dépendances :
   ```sh
   npm install
   ```
3. Créer le fichier `.env` dans le dossier `backend` (exemple :)
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/citizen-complaints
   JWT_SECRET=changeme123
   MAIL_USER=youraddress@gmail.com
   MAIL_PASS=your-app-password
   ```
4. Créer un admin via le script :
   ```sh
   node scripts/create-admin.js
   ```
5. Lancer le backend :
   ```sh
   npm run dev
   ```

### Script création admin
- Utilisez `node scripts/create-admin.js` pour générer un compte admin initial (voir le script pour modifier email/mot de passe).

## Principaux Endpoints API

### Authentification Admin
- Seul l’admin (créé via script) peut accéder à la gestion et au suivi des réclamations.
- Il n’y a PAS de création de compte utilisateur pour les citoyens.
- Pas besoin de s’inscrire ni de se connecter pour poster une réclamation.

### Réclamations
- `POST /api/complaints` — Soumettre une réclamation (tout le monde, sans compte)
  - FormData: `{ name, email, title, type, details, attachment (fichier, optionnel) }`
- `GET /api/complaints` — Liste de toutes les réclamations (admin uniquement, nécessite JWT)
- `PATCH /api/complaints/:id` — Mettre à jour une réclamation (admin uniquement, nécessite JWT)
  - Body: champs à modifier (`status`, etc.)

### Pièces jointes
- `GET /uploads/:filename` — Télécharger une pièce jointe (publique)

### Sécurité & Auth
- Authentification par JWT pour les routes admin/protégées
- Les routes publiques : création de réclamation, login, register
- Les routes protégées (admin) : voir/modifier toutes les réclamations

---

## Notes complémentaires
- Les données sont stockées dans des fichiers NeDB (`backend/db/`)
- Les pièces jointes sont stockées dans `backend/uploads/` et accessibles via `/uploads/nomdufichier`

## Sécurité
- JWT, rôles, validation

## À venir
- Notifications email
- Tableau de bord admin
- Statistiques et rapports
