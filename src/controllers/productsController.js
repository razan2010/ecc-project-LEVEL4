const Product = require('../models/Product');
const Category = require('../models/Category'); 
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/customErrors');

exports.createProduct = asyncHandler(async (req, res) => {
  if (req.body.category) {
    const categoryExists = await Category.findById(req.body.category);
    if (!categoryExists) {
      throw new AppError('Category not found', 404);
    }
  }

  const product = new Product(req.body);
  await product.save();
  res.status(201).json({ success: true, message: 'Operation successful', data: product });
});

exports.getProducts = asyncHandler(async (req, res) => {
  let query = {};

  if (req.query.search) {
    const searchKeyword = String(req.query.search).trim();
    query.$or = [
      { name: { $regex: searchKeyword, $options: 'i' } },
      { description: { $regex: searchKeyword, $options: 'i' } }
    ];
  }

  if (req.query.category) {
    query.category = String(req.query.category).trim();
  }

  if (req.query.minPrice || req.query.maxPrice) {
    query.price = {};
    if (req.query.minPrice) query.price.$gte = parseFloat(req.query.minPrice);
    if (req.query.maxPrice) query.price.$lte = parseFloat(req.query.maxPrice);
  }

  if (req.query.inStock === 'true') {
    query.stock = { $gt: 0 };
  }

  const products = await Product.find(query).populate('category', 'name');
  res.status(200).json({ success: true, count: products.length, data: products });
});

exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category', 'name description');
  
  if (!product) {
    throw new AppError('Product not found.', 404);
  }
  
  res.status(200).json({ success: true, message: 'Operation successful', data: product });
});

exports.updateProduct = asyncHandler(async (req, res) => {
  if (req.body.category) {
    const categoryExists = await Category.findById(req.body.category);
    if (!categoryExists) {
      throw new AppError('Category not found', 404);
    }
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!product) throw new AppError('Product not found.', 404);
  res.status(200).json({ success: true, message: 'Operation successful', data: product });
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw new AppError('Product not found.', 404);
  res.status(200).json({ success: true, message: 'Product record successfully unlinked from database.' });
});
