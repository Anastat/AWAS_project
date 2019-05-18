const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const errorController = require('./controllers/error');

const app = express();

const db = require('./models');
const User = db.User;

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const publicRoutes = require('./routes/public');
const authRoutes = require('./routes/auth');

const LoggerMiddleware = (req,res,next) =>{
  console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`)
  next();
}
app.use(LoggerMiddleware);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secretthathashrandomcookie',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

// next middleware used to share common view informations
app.use((req, res, next) => {
  res.locals = {
    isAuthenticated: req.session.isAuthenticated || null,
    isAdmin: req.session.isAdmin || false
  };
  next();
})

// if session retrive complete user object
app.use((req, res, next) => {
  if (!req.session.user) return next();
  User.findByPk(req.session.user.username)
  .then(user => {
    res.user = user;
    next();
  })
})

app.use((req, res, next) => {
  if (req.session.user) next();
  (db.User).findByPk("test").then(user => {
    req.session.user = user;
    next();
  });
})

app.use('/admin', adminRoutes);
app.use(publicRoutes);
app.use(authRoutes);
app.use(userRoutes);

app.use(errorController.get404);


db.reset()
  .then(result => {
    return (db.User).findByPk("test");
  })
  .then(user => {
    if (!user) return db.User.create({ username: 'test', password: 'hey', is_admin: true });  
  })
  .then(user => { 
    app.listen(3000);
    console.log("server listening"); 
  });

  
  