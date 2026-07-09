const { body } = require('express-validator');

exports.orderSchema = [
  body('userId').trim().notEmpty().withMessage('User ID is required to process checkout routing execution')
];
