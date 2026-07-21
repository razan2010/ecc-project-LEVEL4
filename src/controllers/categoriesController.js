const Category = require('../models/Category');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/customErrors');


exports.createCategory = asyncHandler(async (req, res) => {
  const category = new Category(req.body);
  await category.save();
  res.status(201).json({ success: true, data: category });
});


exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({ success: true, count: categories.length, data: categories });
});


exports.getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw new AppError('Category not found with that specific ID.', 404);
  }
  res.status(200).json({ success: true, data: category });
});
exports.updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!category) {
    throw new AppError('Cannot update. Category not found.', 404);
  }
  res.status(200).json({ success: true, data: category });
});
exports.deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    throw new AppError('Cannot delete. Category not found.', 404);
  }
  res.status(200).json({ success: true, message: 'Category records successfully removed from database.' });
});
