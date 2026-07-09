const express = require('express');
const router = express.Router();
const { createCategory, getCategories } = require('../controllers/categoriesController');
const { categorySchema } = require('../validators/categoryValidator');
const validate = require('../utils/validate');

router.post('/', categorySchema, validate, createCategory);
router.get('/', getCategories);

module.exports = router;
