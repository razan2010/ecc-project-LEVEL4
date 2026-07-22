const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/customErrors');

const recalculateCartTotals = (cart) => {
  let total = 0;
  cart.items.forEach(item => {
    total += item.price * item.quantity;
  });
  cart.totalPrice = total;
};

exports.addToCart = asyncHandler(async (req, res) => {
  const { userId, productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product) throw new AppError('Product not found.', 404);
  if (product.stock <= 0 || product.stock < quantity) {
    throw new AppError('Product is out of stock or requested quantity exceeds available stock.', 400);
  }

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({
      user: userId,
      items: [{ product: productId, quantity, price: product.price }],
      totalPrice: product.price * quantity
    });
  } else {
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    
    if (itemIndex > -1) {
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

exports.getCart = asyncHandler(async (req, res) => {
  const { userId } = req.query;
  const targetUser = userId || req.params.userId || "customer_99";
  
  const cart = await Cart.findOne({ user: targetUser }).populate('items.product');
  
  // Rule Fix: If cart doesn't exist, return an empty cart object instead of throwing a 404 error
  if (!cart) {
    return res.status(200).json({ success: true, data: { user: targetUser, items: [], totalPrice: 0 } });
  }
  
  res.status(200).json({ success: true, data: cart });
});

exports.updateCartQuantity = asyncHandler(async (req, res) => {
  const { userId, quantity } = req.body;
  const { productId } = req.params;

  if (parseInt(quantity) <= 0) {
    return exports.removeItemFromCart(req, res);
  }

  const product = await Product.findById(productId);
  if (!product || product.stock < quantity) throw new AppError('Insufficient stock bounds to fulfill adjustment request.', 400);

  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new AppError('Cart instance untraceable.', 404);

  const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
  if (itemIndex === -1) throw new AppError('Item not present inside active cart matrix array.', 404);

  cart.items[itemIndex].quantity = quantity;
  recalculateCartTotals(cart);

  await cart.save();
  res.status(200).json({ success: true, message: 'Quantity altered and totals recompiled.', data: cart });
});

exports.removeItemFromCart = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new AppError('Cart reference not found.', 404);

  cart.items = cart.items.filter(item => item.product.toString() !== productId);
  recalculateCartTotals(cart);

  await cart.save();
  res.status(200).json({ success: true, message: 'Line item completely unlinked from cart.', data: cart });
});

exports.clearCart = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new AppError('Cart target document missing.', 404);

  cart.items = [];
  cart.totalPrice = 0;

  await cart.save();
  res.status(200).json({ success: true, message: 'Entire shopping cart cleared.', data: cart });
});
