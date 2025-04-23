# Backend - Gestion des réclamations citoyennes

## Stack
- Node.js + Express
- MongoDB (Mongoose)
- Authentification JWT

## Structure
- `models/` : Schémas Mongoose (User, Complaint)
- `routes/` : Routes API (utilisateurs, réclamations)
- `index.js` : Point d’entrée serveur

## Démarrage
1. Installer les dépendances : `npm install`
2. Lancer MongoDB en local
3. Lancer le serveur : `npm run dev`

## Endpoints principaux
- `POST /api/users/register` : inscription
- `POST /api/users/login` : connexion
- `POST /api/complaints` : nouvelle réclamation (authentifié)
- `GET /api/complaints` : liste des réclamations (citoyen : ses réclamations, agent/admin : toutes)
- `PATCH /api/complaints/:id` : mise à jour (agent/admin)

## Sécurité
- JWT, rôles, validation

## À venir
- Notifications email
- Tableau de bord admin
- Statistiques et rapports
