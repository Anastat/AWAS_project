const db = require('../models');

// here should be popolate database
exports.resetDb = (req, res, next) => {
  db.reset(true)
  .then(result => insertFlag())
  .then(result => popolateUser())
  .then(result => populateProduct())
  .then(() => res.status(200).send('DATABASE RESET STATUS: SUCCESSFULL'))
  .catch(err => { console.log(err); return res.status(500).send('DATABASE RESET STATUS: FAILED; PLEASE CONTACT ADMIN')});
} 

function insertFlag() {
  return db.sequelize.query("INSERT INTO \"Users\" (username, password, is_admin) VALUES (?, ?, ?)", {
    replacements: ['FLAG', 'FLAG:L3T1TDr0PM4N', true ],
    type: db.Sequelize.QueryTypes.INSERT
  });
}

function popolateUser() {
  return db.User.bulkCreate([
    { username: 'BAILEY16',     password: 'madison',   is_admin: true  },
    { username: 'calltopower1', password: 'letmein',   is_admin: false },
    { username: 'aaawsome2',    password: 'password',  is_admin: false },
  ])
}

function populateProduct() {
  return db.Product.bulkCreate([
    { title: 'An awesome Grade', price: 10000, description: 'Can you get it?',
      imageUrl: 'http://santansun.com/wp-content/uploads/2018/10/a-plus-school-letter-grade.jpg'
    },
    { title: 'Ice cream', price: 5, description: 'An ice cream',
      imageUrl: 'https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-cone-1274894_1280.jpg', 
    },
    { title: 'Blueberry', price: 10, description: 'Blueberry',
      imageUrl: 'https://cdn.pixabay.com/photo/2015/03/26/09/40/blueberries-690072_1280.jpg', 
    },
    { title: 'Bread', price: 5, description: 'Let them eat cake.',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/05/01/09/13/bread-4170338_1280.jpg', 
    },
    { title: 'Cupcake', price: 2.5, description: 'Cupcake, what else?',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/05/20/14/34/cake-4216792_1280.jpg', 
    },
    { title: 'Burger', price: 3.95, description: 'A tasteful Burger',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/05/20/18/31/burger-4217255_1280.jpg', 
    },
    { title: 'Apple', price: 2, description: 'Netwon style never dies',
      imageUrl: 'https://cdn.pixabay.com/photo/2017/09/26/13/42/apple-2788662_1280.jpg', 
    }
  ])
}