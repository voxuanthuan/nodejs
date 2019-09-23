const db = require('../db');
var md5 = require('md5');

module.exports.getLogin = function (req, res) {
  res.render('auth/login');
}

module.exports.postLogin = function (req, res) {
  const email = req.body.email;
  const user = db.get('users').find({ email }).value();

  if (!user) {
    res.render('auth/login', {
      errors: [
        'User not exist.'
      ],
      email
    })
    return;
  }


  if (user.password !== md5(req.body.password)) {
    res.render('auth/login', {
      errors: [
        'Password Fail.'
      ],
      email
    })
    return;
  }
  res.cookie('userId', user.id)
  res.redirect('/users');
}