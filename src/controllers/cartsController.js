const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/customErrors');

exports.addToCart = asyncHandler(async (req, res) => {
  const { userId, productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product) throw new AppError('The requested product cannot be verified.', 404);

  if (product.countInStock < quantity) {
    throw new AppError(`Stock deficit error. Only ${product.countInStock} items currently available in store.`, 400);
  }

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [{ product: productId, quantity }] });
  } else {
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      const newQuantity = cart.items[itemIndex].quantity + quantity;
      if (product.countInStock < newQuantity) {
        throw new AppError(`Cannot adjust volume allocation. Total units exceed limits of ${product.countInStock}`, 400);
      }
      cart.items[itemIndex].quantity = newQuantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
  }

  await cart.save();
  res.status(200).json({ success: true, data: cart });
});

exports.getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.product');
  if (!cart) throw new AppError('This user active cart layout is unallocated or completely empty', 404);
  res.status(200).json({ success: true, data: cart });
});
// 3. UPDATE ITEM QUANTITY INSIDE CART
exports.updateCartQuantity = asyncHandler(async (req, res) => {
  const { userId, productId, quantity } = req.body;

  // Verify the product still exists in the store
  const product = await Product.findById(productId);
  if (!product) throw new AppError('Product not found.', 404);

  // Check if the store actually has enough stock for this new quantity
  if (product.countInStock < quantity) {
    throw new AppError(`Only ${product.countInStock} items available in stock.`, 400);
  }

  // Find the user's cart
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new AppError('Cart not found.', 404);

  // Find where the product is inside the cart items list
  const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
  if (itemIndex === -1) throw new AppError('This item is not in your cart.', 404);

  // Change the old quantity to the new choice
  cart.items[itemIndex].quantity = quantity;

  await cart.save();
  res.status(200).json({ success: true, message: 'Cart quantity updated.', data: cart });
});

// 4. COMPLETELY REMOVE AN ITEM FROM CART
exports.removeItemFromCart = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;

  const cart = await Cart.findOne({ userId });
  if (!cart) throw new AppError('Cart not found.', 404);

  // Filter out the product, removing it completely from the items array
  cart.items = cart.items.filter(item => item.product.toString() !== productId);

  await cart.save();
  res.status(200).json({ success: true, message: 'Item removed from your cart.', data: cart });
}); 
exports.clearCart = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const cart = await Cart.findOne({ userId });
  if (!cart) throw new AppError('Cart not found.', 404);

  // Set the items array back to empty
  cart.items = [];
  await cart.save();

  res.status(200).json({ success: true, message: 'Cart cleared completely.', data: cart });
});
