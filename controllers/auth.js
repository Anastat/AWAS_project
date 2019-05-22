const bcrypt = require('bcryptjs');

const models = require('../models');
const User = models.User;

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: null
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  message = message.length > 0 ? message[0] : null;
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message,
    complete: false
  });
};

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findByPk(username)
    .then(user => {
      var message = null;
      if (!user) message = 'Invalid username or password.'; 
      // if password incorrect but user found add an extra space
      console.log(user, user != null && !user.validPassword(password));
      if(user != null && !user.validPassword(password)) {
        message = 'Invalid  username or password.';
      }
      if ( message ) {
        return res.render('auth/login', {
          path: '/login',
          pageTitle: 'Login',
          errorMessage: message
        });
      }
      req.session.isAuthenticated = true;
      req.session.isAdmin = user.is_admin;
      req.session.user = user;
      req.session.save(err => {
        return res.redirect('/');
      });
    })
    .catch(err =>{ console.log(err); res.redirect('/'); });
};

exports.postSignup = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  if ( password !== confirmPassword ) {
    req.flash('error', 'Password and confirm password don\'t match.');
    return res.redirect('/signup');
  }
  User.findOne({where: { username: username }})
    .then(userDoc => {
      if (userDoc) {
        req.flash('error', 'Username already taken, please pick a different one.');
        return res.redirect('/signup');
      }
      User.create({ username: username, password: password })
        .then(result => { 
          res.render('auth/signup', {
            path: '/signup',
            pageTitle: 'Signup',
            errorMessage: null,
            complete: true
          });
        });
    })
    .catch(err =>{ res.redirect('/'); });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
