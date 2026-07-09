const Category = require('../models/Category');
const asyncHandler = require('../utils/asyncHandler');

exports.createCategory = asyncHandler(async (req, res) => {
  const category = new Category(req.body);
  await category.save();
  res.status(201).json({ success: true, data: category });
});

exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({ success: true, data: categories });
});
