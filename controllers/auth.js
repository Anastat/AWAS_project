const bcrypt = require('bcryptjs');

const models = require('../models');
const User = models.User;

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  message = message.length > 0 ? message[0] : null;
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  message = message.length > 0 ? message[0] : null;
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findByPk(username)
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login');  
      }
      // if password incorrect but user found add an extra space
      if(!user.validPassword(password)) {
        req.flash('error', 'Invalid  email or password.');
        return res.redirect('/login'); 
      }
      req.session.isAuthenticated = true;
      req.session.isAdmin = user.is_admin;
      req.session.user = user;
      req.session.save(err => {
        return res.redirect('/');
      });
    })
    .catch(err => console.log(err));
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
      .then(result => { res.redirect('/login'); });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
