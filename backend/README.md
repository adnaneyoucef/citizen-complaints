# Backend - Gestion des réclamations citoyennes

## Installation de Node.js (Windows)

(Si ce n'est pas déjà fait, voir les instructions dans le README global.)

## Fonctionnalités principales (avec exemples de code)

### 1. Soumission d'une réclamation (citoyen)
- **Explication :** Route ouverte à tous pour déposer une réclamation avec pièce jointe.
- **Exemple de code (extrait de `routes/complaint.js`) :**
  ```js
  // Submit a complaint (open to all, with file upload)
  router.post('/', upload.single('attachment'), (req, res) => {
    const { name, email, title, type, details } = req.body;
    const attachment = req.file ? req.file.filename : undefined;
    const complaint = { name, email, title, type, details, attachment, status: 'submitted', createdAt: new Date(), updatedAt: new Date() };
    // ...
    complaintDB.insert(complaint, (err, newDoc) => {
      if (err) return res.status(500).json({ message: 'Server error', error: err.message });
      res.status(201).json(newDoc);
    });
  });
  ```

### 2. Authentification admin avec JWT
- **Explication :** Middleware pour sécuriser les routes admin.
- **Exemple de code :**
  ```js
  // Middleware: Auth
  function auth(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch {
      res.status(401).json({ message: 'Invalid token' });
    }
  }
  ```

### 3. Envoi d'e-mails automatiques (HTML)
- **Explication :** Lorsqu'un admin envoie un résultat, un email HTML stylisé est généré et envoyé au citoyen.
- **Exemple de code (extrait de `routes/complaintResult.js`) :**
  ```js
  const html = `
    <div style="font-family: 'Tajawal', Arial, sans-serif; background: #f9fafb; padding: 24px;">
      <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; box-shadow: 0 2px 8px #eee; padding: 32px;">
        <h2 style="color: #183a5a;">مرحباً ${complaint.name || ''},</h2>
        <p style="font-size: 18px; color: #333;">تم تحديث حالة الشكوى الخاصة بك.</p>
        ...
      </div>
    </div>
  `;
  await sendMail({
    to: complaint.email,
    subject: 'نتيجة الشكوى الخاصة بك',
    text: `السلام عليكم ...`,
    html
  });
  ```

### 4. Nettoyage automatique des doublons
- **Explication :** Endpoint pour supprimer les réclamations en double.
- **Exemple de code (extrait de `routes/cleanup.js`) :**
  ```js
  router.post('/cleanup-complaints', async (req, res) => {
    // ...logique de suppression des doublons...
    res.json({ message: 'Doublons supprimés.' });
  });
  ```

### 5. Gestion des utilisateurs (création admin)
- **Explication :** Script pour créer un admin si aucun n'existe.
- **Exemple de code (extrait de `scripts/create-admin.js`) :**
  ```js
  if (!admin) {
    const hashed = await bcrypt.hash(password, 10);
    await userDB.insert({ email, password: hashed, role: 'admin' });
    console.log('Admin créé:', email);
  }
  ```

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

### 📧 Configuration email (Gmail App Password recommandé)
- Activez la validation en deux étapes sur https://myaccount.google.com/security
- Générez un App Password sur https://myaccount.google.com/apppasswords (choisir "Mail" et "Other (NodeMailer)")
- Copiez le mot de passe généré dans `MAIL_PASS`
- Utilisez votre adresse Gmail complète dans `MAIL_USER`

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
