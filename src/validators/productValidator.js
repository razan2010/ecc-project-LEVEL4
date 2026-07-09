const { body } = require('express-validator');

exports.productSchema = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('countInStock').isInt({ min: 0 }).withMessage('Stock must be a non-negative whole integer'),
  body('category').isMongoId().withMessage('Invalid Category database reference ID format')
];
