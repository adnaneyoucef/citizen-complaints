// Script Node.js pour créer un compte admin dans NeDB
const bcrypt = require('bcryptjs');
const userDB = require('../models/User');

const name = 'Adnane';
const email = 'adnane@email.com';
const password = 'adnane123'; // Changez ce mot de passe après la création !
const role = 'admin';

userDB.findOne({ email }, async (err, existing) => {
  if (err) return console.error('Erreur accès DB:', err);
  if (existing) return console.log('Un utilisateur avec cet email existe déjà.');
  const hashed = await bcrypt.hash(password, 10);
  const user = { name, email, password: hashed, role, createdAt: new Date(), updatedAt: new Date() };
  userDB.insert(user, (err2, newUser) => {
    if (err2) return console.error('Erreur création admin:', err2);
    console.log('Compte admin créé avec succès:', newUser);
  });
});
