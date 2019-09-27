const Product = require('../../models/product.model');
// const db = require('../db');
// const Product = db.get('products').value();
module.exports.index = async function (req, res) {
  const products = await Product.find();
  res.json(products);
}