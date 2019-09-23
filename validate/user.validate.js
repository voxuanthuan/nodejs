module.exports.postCreate = function (req, res, next) {
  const errors = [];
  if (!req.body.name) {
    errors.push('Name is required.');
  }

  if (!req.body.phone) {
    errors.push('Phone is required')
  }
  console.log(errors);

  if (errors.length) {
    res.render('users/create', {
      errors: errors,
      values: req.body
    })
    return;
  }
  next();
}
