const express = require('express');
const router = express.Router();
const { 
  checkoutOrder, 
  getOrders, 
  getOrderById, 
  updateOrderStatus 
} = require('../controllers/ordersController');
const { orderSchema } = require('../validators/orderValidator');
const validate = require('../utils/validate');

router.post('/', orderSchema, validate, checkoutOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.patch('/:id/status', updateOrderStatus);

module.exports = router;


