const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');

exports.createProduct = asyncHandler(async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json({ success: true, data: product });
});

exports.getProducts = asyncHandler(async (req, res) => {
  let query = {};

  if (req.query.category) {
    query.category = req.query.category;
  }

  if (req.query.maxPrice) {
    query.price = { $lte: parseFloat(req.query.maxPrice) };
  }

  const products = await Product.find(query).populate('category', 'name');
  res.status(200).json({ success: true, count: products.length, data: products });
});
