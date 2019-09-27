const db = require('../db');
module.exports = function (req, res, next) {
  const sessionId = req.signedCookies.sessionId;
  const count = db.get('sessions').find({ id: sessionId }).get('cart').value();
  var counter = 0;
  for (var i in count) {
    counter += count[i];
  }
  res.locals.count = counter;
  next();
}