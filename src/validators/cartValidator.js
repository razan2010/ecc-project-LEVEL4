const { body } = require('express-validator');

exports.cartSchema = [
  body('userId').trim().notEmpty().withMessage('User Identification ID string is required'),
  body('productId').isMongoId().withMessage('Invalid Product reference ID format'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be an integer of 1 or greater')
];
