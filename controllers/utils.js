const db = require('../models');

// here should be popolate database
exports.resetDb = (req, res, next) => {
  db.reset(true)
  .then(result => {
    return (db.User).findByPk("test");
  })
  .then(user => {
    if (!user) return db.User.create({ username: 'test', password: 'hey', is_admin: true });  
  })
  .then(() => res.status(200).send('DATABASE RESET STATUS: SUCCESSFULL'))
  .catch(err => { console.log(err); return res.status(500).send('DATABASE RESET STATUS: FAILED; PLEASE CONTACT ADMIN')});
} 