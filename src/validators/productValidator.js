const { body } = require('express-validator');

exports.productSchema = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('description').trim().notEmpty().withMessage('Product description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a valid positive number'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative whole integer'),
  body('category').isMongoId().withMessage('Invalid Category database reference format ID')
];
