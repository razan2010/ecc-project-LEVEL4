const express = require('express');
const router = express.Router();
const { 
  addToCart, 
  getCart, 
  updateCartQuantity, 
  removeItemFromCart,
  clearCart 
} = require('../controllers/cartsController');
const { cartSchema } = require('../validators/cartValidator');
const validate = require('../utils/validate');

router.get('/', getCart);
router.delete('/', clearCart);
router.post('/items', cartSchema, validate, addToCart);

router.patch('/items/:productId', updateCartQuantity);
router.delete('/items/:productId', removeItemFromCart);

module.exports = router;
