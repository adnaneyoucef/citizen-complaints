# Backend - Gestion des réclamations citoyennes

## Stack
- Node.js + Express
- NeDB (base locale, fichiers .db)
- Authentification JWT

## Structure
- `models/` : Modèles NeDB (User, Complaint)
- `routes/` : Routes API (utilisateurs, réclamations)
- `index.js` : Point d’entrée serveur

## Démarrage
1. Installer les dépendances : `npm install`
2. Lancer le serveur : `npm run dev`

### Déploiement sur Render
- Créez un service web sur https://render.com/ (Node.js)
- Ajoutez vos variables d'environnement si besoin (JWT_SECRET, etc.)
- Les fichiers NeDB sont stockés dans `backend/db/` (persistance automatique)
- Le backend sera accessible via une URL publique Render

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

### Script création admin
- Lancer `node scripts/create-admin.js` pour générer un compte admin initial
- Modifier le script pour changer l’email/mot de passe par défaut

---

## Notes complémentaires
- Les données sont stockées dans des fichiers NeDB (`backend/db/`)
- Le backend peut être déployé sur Render (voir section plus haut)
- Les pièces jointes sont stockées dans `backend/uploads/` et accessibles via `/uploads/nomdufichier`

## Sécurité
- JWT, rôles, validation

## À venir
- Notifications email
- Tableau de bord admin
- Statistiques et rapports
