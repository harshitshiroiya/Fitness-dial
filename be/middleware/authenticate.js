function authenticate(req, res, next) {
  if (!req.session || !req.session.user) {
    res.status(401).send({
      message: "You shall not pass",
    });
    return;
  }
  req.userId = req.session.user.userId;
  next();
}

module.exports = authenticate;
