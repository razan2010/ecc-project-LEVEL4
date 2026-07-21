const express = require('express');
const router = express.Router();
const { 
  createCategory, 
  getCategories, 
  getCategoryById, 
  updateCategory, 
  deleteCategory 
} = require('../controllers/categoriesController');
const { categorySchema } = require('../validators/categoryValidator');
const validate = require('../utils/validate');

router.post('/', categorySchema, validate, createCategory);

router.get('/', getCategories);

router.get('/:id', getCategoryById);

router.patch('/:id', categorySchema, validate, updateCategory);

router.delete('/:id', deleteCategory);

module.exports = router;
