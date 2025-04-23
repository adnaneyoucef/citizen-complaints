const express = require('express');
const router = express.Router();
const userDB = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', (req, res) => {
  const { name, email, password, role } = req.body;
  userDB.findOne({ email }, async (err, existing) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err.message });
    if (existing) return res.status(400).json({ message: 'Email already in use' });
    const hashed = await bcrypt.hash(password, 10);
    const user = { name, email, password: hashed, role, createdAt: new Date(), updatedAt: new Date() };
    userDB.insert(user, (err2, newUser) => {
      if (err2) return res.status(500).json({ message: 'Server error', error: err2.message });
      res.status(201).json({ message: 'User registered' });
    });
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Tentative de login:', email, password);
  userDB.findOne({ email }, async (err, user) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err.message });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  });
});

module.exports = router;
