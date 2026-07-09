const { body } = require('express-validator');

exports.categorySchema = [
  body('name').trim().notEmpty().withMessage('Category name is required').isString()
];
