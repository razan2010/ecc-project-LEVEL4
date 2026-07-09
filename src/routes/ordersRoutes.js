const express = require('express');
const router = express.Router();

// COMBINED IMPORT: All 3 functions from the controller go inside these brackets together:
const { 
  getOrders, 
  updateOrderStatus,
  checkoutOrder 
} = require('../controllers/ordersController');

const { orderSchema } = require('../validators/orderValidator');
const validate = require('../utils/validate');

// ROUTE ENDPOINTS
router.post('/checkout', orderSchema, validate, checkoutOrder);
router.get('/', getOrders); 
router.put('/:id/status', updateOrderStatus); 

module.exports = router;
