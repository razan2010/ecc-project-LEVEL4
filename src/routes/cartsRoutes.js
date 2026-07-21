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

// Endpoint: GET /api/cart (Get current cart with populated items)
router.get('/', getCart);

// Endpoint: DELETE /api/cart (Clear the entire cart)
router.delete('/', clearCart);

// Endpoint: POST /api/cart/items (Add product to cart)
router.post('/items', cartSchema, validate, addToCart);

// Endpoint: PUT /api/cart/items/:productId (Update product quantity inside path parameter)
router.put('/items/:productId', updateCartQuantity);

// Endpoint: DELETE /api/cart/items/:productId (Remove product from cart row)
router.delete('/items/:productId', removeItemFromCart);

module.exports = router;
