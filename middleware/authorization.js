exports.notLoggedIn = (req, res, next) => {
  if (!req.session.isAuthenticated) return next();
  res.redirect('/');
}

exports.isLoggedIn =  (req, res, next) => {
  if (req.session.isAuthenticated) return next();
  res.redirect('/login');
}

// ALL THE FOLLOWING CHECKS ALSO IF LOGGEDIN
// isAdmin is used to protect admin only routes
exports.isAdmin = (req, res, next) => {
  if (req.session.isAuthenticated && req.session.isAdmin) {
    return next();
  };
  res.redirect('/');
}
// isUser is used to protect user only routes
exports.isUser = (req, res, next) => {
  if (req.session.isAuthenticated && !req.session.isAdmin) {
    return next();
  }
  res.redirect('/');
}