const express = require('express');
const router = express.Router();
const complaintDB = require('../models/Complaint');

// Clean up duplicates: keep only the latest complaint for each (name, email, title, type)
const cleanupHandler = async (req, res) => {
  try {
    // Fetch all complaints, sorted by createdAt DESC (latest first)
    complaintDB.find({}).sort({ createdAt: -1 }).exec((err, docs) => {
      if (err) return res.status(500).json({ message: 'Server error', error: err.message });
      const seen = new Set();
      const toKeep = [];
      const toDelete = [];
      for (const doc of docs) {
        const key = `${doc.name}|${doc.email}|${doc.title}|${doc.type}`;
        if (!seen.has(key)) {
          seen.add(key);
          toKeep.push(doc._id);
        } else {
          toDelete.push(doc._id);
        }
      }
      if (toDelete.length === 0) {
        return res.json({ message: 'No duplicates found.' });
      }
      // Remove all duplicates
      complaintDB.remove({ _id: { $in: toDelete } }, { multi: true }, (removeErr, numRemoved) => {
        if (removeErr) return res.status(500).json({ message: 'Error removing duplicates', error: removeErr.message });
        res.json({ message: `Removed ${numRemoved} duplicate complaints.`, removed: numRemoved });
      });
    });
  } catch (e) {
    res.status(500).json({ message: 'Unexpected error', error: e.message });
  }
};

router.post('/cleanup-complaints', cleanupHandler);
router.get('/cleanup-complaints', cleanupHandler);

module.exports = router;
