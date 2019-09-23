const db = require('../db');
module.exports.requireAuth = function (req, res, next) {
  console.log(req.cookies);
  if (!req.cookies.userId) {
    res.redirect('/auth/login');
    return;
  }

  const user = db.get('users').find({ id: req.cookies.userId }).value();

  if (!user) {
    res.redirect('/auth/login');
    return;
  }
  next();
}