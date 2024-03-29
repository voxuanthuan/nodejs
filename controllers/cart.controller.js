const db = require('../db');
module.exports.addToCart = function (req, res, next) {
  console.log(req.route);
  const productId = req.params.productId;
  const sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect('/products');
    return;
  }
  const count = db
    .get('sessions')
    .find({ id: sessionId })
    .get('cart.' + productId, 0).value();

  db.get('sessions').find({ id: sessionId }).set('cart.' + productId, count + 1).write();
  res.redirect('/products');
}