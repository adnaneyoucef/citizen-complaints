const express = require('express');
const router = express.Router();
const complaintDB = require('../models/Complaint');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

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

// Submit a complaint (open to all, with file upload)
router.post('/', upload.single('attachment'), (req, res) => {
  const { name, email, title, type, details } = req.body;
  const attachment = req.file ? req.file.filename : undefined;
  const complaint = {
    name,
    email,
    title,
    type,
    details,
    attachment,
    status: 'submitted',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  complaintDB.insert(complaint, (err, newDoc) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err.message });
    res.status(201).json(newDoc);
  });
});

// Get complaints (admin only)
router.get('/', auth, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  complaintDB.find({}).sort({ createdAt: -1 }).exec((err, docs) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err.message });
    res.json(docs);
  });
});

// Update complaint (admin only)
router.patch('/:id', auth, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const update = req.body;
  update.updatedAt = new Date();
  complaintDB.update({ _id: req.params.id }, { $set: update }, { returnUpdatedDocs: true }, (err, numAffected, affectedDocuments) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err.message });
    res.json(affectedDocuments);
  });
});

module.exports = router;
