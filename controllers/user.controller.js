const shortid = require('shortid')
var db = require('../db');
const validate = require('../validate/user.validate');

module.exports.index = function (req, res) {
  const users = db.get('users').value();
  res.render('users/index', {
    users
  })
}

module.exports.getSearch = function (req, res) {
  const q = req.query.q;
  const users = db.get('users').value();
  const userMatched = users.filter((user) => {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  })
  res.render('users', {
    users: userMatched,
  })
}

module.exports.getCreate = function (req, res) {
  res.render('users/create');
}

module.exports.postCreate = function (req, res) {
  req.body.id = shortid.generate();
  req.body.avatar = req.file.path.split('/').slice(1).join('/');
  db.get('users')
    .push(req.body)
    .write()
  db.get('users').find()
  const users = db.get('users').value();
  res.render('users/index', {
    users
  });
}

module.exports.getView = function (req, res) {
  const id = req.params.id;

  const user = db.get('users').find({ id: id }).value();
  res.render('users/view', {
    user
  });
} 