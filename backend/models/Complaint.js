const Datastore = require('nedb');
const path = require('path');

const complaintDB = new Datastore({
  filename: path.join(__dirname, '../db/complaints.db'),
  autoload: true
});

module.exports = complaintDB;
