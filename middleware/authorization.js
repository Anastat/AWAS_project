exports.notLoggedIn = (req, res, next) => {
  if (!req.session.isAuthenticated) console.log("triggered")
  next();
}

exports.isLoggedIn =  (req, res, next) => {
  if (req.session.isAuthenticated) console.log("triggered")
  next();
}

// ALL THE FOLLOWING CHECKS ALSO IF LOGGEDIN
// isAdmin is used to protect admin only routes
exports.isAdmin = (req, res, next) => {
  if (req.session.isAuthenticated && req.session.isAdmin) {
    console.log("triggered")
  };
  next();
}
// isUser is used to protect user only routes
exports.isUser = (req, res, next) => {
  if (req.session.isAuthenticated && !req.session.isAdmin) {
    console.log("triggered")
  }
  next();
  
}