const express = require('express');
const router = express.Router();
const { 
  addToCart, 
  getCart, 
  updateCartQuantity, 
  removeItemFromCart,clearCart
} = require('../controllers/cartsController');

const { cartSchema } = require('../validators/cartValidator');
const validate = require('../utils/validate');

router.post('/add', cartSchema, validate, addToCart);
router.get('/:userId', getCart);

router.put('/update-quantity', cartSchema, validate, updateCartQuantity);

router.delete('/remove-item', removeItemFromCart);

router.post('/clear', clearCart); 

module.exports = router;
