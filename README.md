# Citizen Complaints Management - DEMO

## 🚀 Démarrage rapide (Quickstart)

1. **Cloner le dépôt**
   ```sh
   git clone <url-du-repo>
   cd citizen-js
   ```
2. **Installer Node.js** (si ce n'est pas déjà fait)
   - Télécharger la version LTS sur [nodejs.org](https://nodejs.org/fr/download/)
   - Vérifier dans un terminal :
     ```sh
     node -v
     npm -v
     ```
3. **Lancer la démo**
   ```sh
   start-demo-full.bat
   ```
   - Ce script installe toutes les dépendances, crée les fichiers nécessaires, lance le backend et le frontend, et prépare un compte admin.
   - Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## ✨ Fonctionnalités principales (avec exemples de code)

### 1. Soumission de réclamations citoyennes sans inscription
- **Explication :** Les citoyens remplissent un formulaire React et l'envoi se fait via l'API Express.
- **Exemple de code (frontend)** :
  ```js
  // ComplaintForm.js
  const handleSubmit = async (e) => {
    e.preventDefault();
    // ...
    await axios.post('http://localhost:5000/api/complaints', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    // ...
  }
  ```
- **Exemple de code (backend)** :
  ```js
  // routes/complaint.js
  router.post('/', upload.single('attachment'), (req, res) => {
    // ...
    complaintDB.insert(complaint, (err, newDoc) => {
      if (err) return res.status(500).json({ message: 'Server error', error: err.message });
      res.status(201).json(newDoc);
    });
  });
  ```

### 2. Tableau de bord administrateur complet
- **Explication :** Permet de visualiser et traiter toutes les réclamations.
- **Exemple de code (frontend)** :
  ```js
  // AdminDashboard.js
  <TableBody>
    {complaints.map((c) => (
      <TableRow key={c._id}>
        <TableCell>{c.title}</TableCell>
        <TableCell>{c.status}</TableCell>
        <TableCell>
          <Button onClick={...}>إرسال النتيجة</Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
  ```

### 3. Notification visuelle et email HTML
- **Explication :** Après action admin, une notification apparaît et un email HTML est envoyé au citoyen.
- **Exemple de code (notification frontend)** :
  ```js
  {successMessage && (
    <Stack sx={{ mb: 3, alignItems: 'center', width: '100%' }}>
      <Paper elevation={8} sx={{ px: 4, py: 2, bgcolor: '#27ae60', color: '#fff', fontWeight: 700, fontSize: 20, borderRadius: 2 }}>
        {successMessage}
      </Paper>
    </Stack>
  )}
  ```
- **Exemple de code (email backend)** :
  ```js
  // routes/complaintResult.js
  const html = `
    <div style="font-family: 'Tajawal', Arial, sans-serif; background: #f9fafb; padding: 24px;">
      ...
      <strong style="color: #27ae60;">نتيجة الإدارة:</strong>
      <div style="margin-top: 10px; color: #222; font-size: 17px;">${result}</div>
      ...
    </div>
  `;
  await sendMail({ to: complaint.email, subject: 'نتيجة الشكوى الخاصة بك', html });
  ```

### 4. Authentification sécurisée JWT pour l'admin
- **Explication :** L'admin se connecte, reçoit un token JWT, et accède à toutes les routes protégées.
- **Exemple de code (backend)** :
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

### 5. Nettoyage automatique des doublons
- **Explication :** Endpoint backend pour supprimer les réclamations en double.
- **Exemple de code (backend)** :
  ```js
  // routes/cleanup.js
  router.post('/cleanup-complaints', async (req, res) => {
    // ...logique de suppression des doublons...
    res.json({ message: 'Doublons supprimés.' });
  });
  ```

### 6. Structure technique
- `backend/` : API Node.js/Express, gestion email, scripts admin
- `frontend/` : Application React (citoyen + admin)
- `screenshots/` : Captures d'écran et prévisualisations
- `start-demo-full.bat` : Script d'installation et de lancement tout-en-un

## 👤 Parcours utilisateur (citoyen)
- Accès direct à la page de dépôt de réclamation
- Saisie des informations et pièces jointes éventuelles
- Réception d'un email de confirmation lors de la mise à jour de la réclamation

## 🛠️ Parcours administrateur
- Connexion via une page sécurisée
- Accès à la liste complète des réclamations
- Visualisation des détails (titre, type, statut, pièce jointe, etc.)
- Envoi d'un résultat (avec notification visuelle et email HTML au citoyen)
- Nettoyage des doublons via endpoint dédié

## 📧 Modèle d'email HTML
- Email stylisé et responsive envoyé lors de la mise à jour d'une réclamation
- Affiche le nom du citoyen, le titre, le type, le statut, et le résultat de l'administration
- Bouton d'accès rapide à la plateforme

## 🗂️ Structure du projet
- `backend/` : API Node.js/Express, base NeDB, scripts admin, gestion email
- `frontend/` : Application React (citoyen + admin), composants Material-UI
- `screenshots/` : Captures d'écran et prévisualisations
- `start-demo-full.bat` : Script d'installation et de lancement tout-en-un

## 🔒 Sécurité
- Authentification JWT pour l'accès admin
- Stockage local sécurisé des identifiants

## 📬 Notifications & Emails
- Notification visuelle verte en haut du dashboard admin après chaque action réussie
- Envoi automatique d'un email HTML personnalisé au citoyen lors de la mise à jour

---

## 📧 Configuration de l'envoi d'emails (Gmail recommandé)

Pour que l'application puisse envoyer des emails (notification citoyen), configurez les variables d'environnement dans `backend/.env` :

```
MAIL_USER=yourgmailaddress@gmail.com
MAIL_PASS=your_app_password_here
```

**Étapes pour obtenir un App Password Gmail :**
1. Activez la validation en deux étapes sur https://myaccount.google.com/security
2. Accédez à https://myaccount.google.com/apppasswords
3. Générez un mot de passe d'application pour "Mail" → "Other (NodeMailer)"
4. Copiez le mot de passe généré (16 caractères, sans espace) dans `MAIL_PASS`

*Voir README backend pour plus de détails.*

---

## 🛠️ Dépendances et Prérequis
- Node.js (LTS recommandé)
- npm
- Accès internet (pour installation des packages et envoi d'email)

## 📋 Fonctionnalités principales
- Soumission de réclamation sans compte (citoyen)
- Tableau de bord admin sécurisé (connexion JWT)
- Téléchargement de pièces jointes
- Notification visuelle de succès (Snackbar)
- Envoi automatique d'email HTML stylisé au citoyen
- Nettoyage automatique des doublons
- Interface responsive (Material-UI) et support complet de l'arabe (RTL)
- Sécurité : JWT, stockage local sécurisé, validation

## 🖼️ Captures d'écran principales

![Accueil](./screenshots/adminlogin.png)
*Accueil utilisateur*

![Dashboard Admin](./screenshots/adminpanel.png)
*Tableau de bord administrateur*

![Formulaire de réclamation](./screenshots/complaint-form.png)
*Soumission d'une réclamation*

---

## 📂 Structure du projet
- `backend/` : API Node.js/Express, base NeDB, scripts admin, gestion email
- `frontend/` : Application React (citoyen + admin), composants Material-UI
- `screenshots/` : Captures d'écran et prévisualisations
- `start-demo-full.bat` : Script d'installation et de lancement tout-en-un

Pour la documentation technique détaillée, voir les README dans `backend/` et `frontend/`.

---

## 📝 Fichiers .env et configuration
- Exemple de `.env` dans `backend/README.md`
- Renseignez bien vos identifiants email (voir section ci-dessus)
- Modifiez l'URL de l'API si besoin pour déploiement

---

## ❓ Dépannage (FAQ)
- **Erreur 535 AUTH lors de l'envoi d'email :**
  - Vérifiez que vous utilisez un App Password Gmail valide (voir plus haut)
  - Si vous changez le mot de passe du compte Google, régénérez un nouvel App Password
  - Vérifiez que le compte n'est pas bloqué par Google
- **Problème d'accès admin :**
  - Utilisez le script `node scripts/create-admin.js` pour générer un compte admin initial
- **Autres bugs :**
  - Consultez les logs du backend pour plus de détails

---

## 🌍 Internationalisation
- L'interface utilisateur prend en charge l'arabe (RTL) et le français
- Les notifications et emails sont adaptés à l'utilisateur

Pour toute contribution ou question, ouvrez une issue sur le dépôt GitHub.
