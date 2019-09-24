const db = require('../db');
const products = db.get('products').value();
module.exports.getProduct = function (req, res) {
  console.log(req.query.page);
  const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1
  const perPage = 8;

  // const start = (page - 1) * perPage;
  // const end = page * perPage;
  const drop = (page - 1) * perPage;
  res.render('products', {
    // products: products.slice(start, end)
    products: db.get('products').drop(drop).take(perPage).value(),
    page: page
  });
}