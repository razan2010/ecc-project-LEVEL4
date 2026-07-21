const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/customErrors');

// Helper utility to calculate total cart price instantly on any change (Required by slide)
const recalculateCartTotals = (cart) => {
  let total = 0;
  cart.items.forEach(item => {
    total += item.price * item.quantity;
  });
  cart.totalPrice = total;
};

// 1. ADD ITEM TO CART (POST /api/cart/items)
exports.addToCart = asyncHandler(async (req, res) => {
  const { userId, productId, quantity } = req.body;

  // Verify product exists and stock > 0 (Key Rule)
  const product = await Product.findById(productId);
  if (!product) throw new AppError('Product not found.', 404);
  if (product.stock <= 0 || product.stock < quantity) {
    throw new AppError('Product is out of stock or requested quantity exceeds available stock.', 400);
  }

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({
      user: userId,
      items: [{ product: productId, quantity, price: product.price }], // Price taken from DB (Key Rule)
      totalPrice: product.price * quantity
    });
  } else {
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    
    if (itemIndex > -1) {
      // Increase quantity instead of adding new item block (Key Rule)
      const targetQuantity = cart.items[itemIndex].quantity + quantity;
      if (product.stock < targetQuantity) throw new AppError('Insufficient inventory stock available.', 400);
      cart.items[itemIndex].quantity = targetQuantity;
    } else {
      cart.items.push({ product: productId, quantity, price: product.price });
    }
    recalculateCartTotals(cart);
  }

  await cart.save();
  res.status(200).json({ success: true, data: cart });
});

// 2. GET CURRENT CART WITH POPULATED PRODUCTS (GET /api/cart)
exports.getCart = asyncHandler(async (req, res) => {
  const { userId } = req.query; // Expects user tracking token as a query parameter or body identifier
  const targetUser = userId || req.params.userId || "customer_99";
  
  const cart = await Cart.findOne({ user: targetUser }).populate('items.product');
  if (!cart) throw new AppError('No active cart database entry instance located for this account.', 404);
  
  res.status(200).json({ success: true, data: cart });
});

// 3. UPDATE PRODUCT QUANTITY (PUT /api/cart/items/:productId)
exports.updateCartQuantity = asyncHandler(async (req, res) => {
  const { userId, quantity } = req.body;
  const { productId } = req.params;

  // If quantity becomes 0, remove item from cart completely (Key Rule)
  if (parseInt(quantity) === 0) {
    return exports.removeItemFromCart(req, res);
  }

  const product = await Product.findById(productId);
  if (!product || product.stock < quantity) throw new AppError('Insufficient stock bounds to fulfill adjustment request.', 400);

  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new AppError('Cart instance untraceable.', 404);

  const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
  if (itemIndex === -1) throw new AppError('Item not present inside active cart matrix array.', 404);

  cart.items[itemIndex].quantity = quantity;
  recalculateCartTotals(cart); // Update totalPrice on quantity change (Key Rule)

  await cart.save();
  res.status(200).json({ success: true, message: 'Quantity altered and totals recompiled.', data: cart });
});

// 4. REMOVE PRODUCT FROM CART (DELETE /api/cart/items/:productId)
exports.removeItemFromCart = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new AppError('Cart reference not found.', 404);

  cart.items = cart.items.filter(item => item.product.toString() !== productId);
  recalculateCartTotals(cart); // Update totalPrice on removal (Key Rule)

  await cart.save();
  res.status(200).json({ success: true, message: 'Line item completely unlinked from cart.', data: cart });
});

// 5. CLEAR THE ENTIRE CART (DELETE /api/cart)
exports.clearCart = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new AppError('Cart target document missing.', 404);

  cart.items = [];
  cart.totalPrice = 0; // Clear total pricing counters (Key Rule)

  await cart.save();
  res.status(200).json({ success: true, message: 'Entire shopping cart cleared.', data: cart });
});
