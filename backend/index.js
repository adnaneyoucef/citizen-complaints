require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Pour servir les fichiers uploadés
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
const userRoutes = require('./routes/user');
const complaintRoutes = require('./routes/complaint');
const cleanupRoutes = require('./routes/cleanup');
const complaintResultRoutes = require('./routes/complaintResult');

app.use('/api/users', userRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/complaints', complaintResultRoutes);
app.use('/api/cleanup', cleanupRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
