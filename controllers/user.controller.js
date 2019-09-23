const shortid = require('shortid')
var db = require('../db');

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
  const errors = [];
  if (!req.body.name) {
    errors.push('Name is required.');
  }

  if (!req.body.phone) {
    errors.push('Phone is required')
  }
  console.log(errors);

  if (errors.length > 0) {
    res.render('users/create', {
      errors: errors,
      values: req.body
    })
    return;
  }
  db.get('users')
    .push(req.body)
    .write()
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