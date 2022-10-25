function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.error = "Please sign in!";
  res.redirect("/");
}

export default ensureAuthenticated;
