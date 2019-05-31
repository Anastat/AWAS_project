const db = require('../models');

// here should be popolate database
exports.resetDb = (req, res, next) => {
  db.reset()
  .then(() => res.status(200).send('DATABASE RESET STATUS: SUCCESSFULL'))
  .catch(err => { console.log(err); return res.status(500).send('DATABASE RESET STATUS: FAILED; PLEASE CONTACT ADMIN')});
} 