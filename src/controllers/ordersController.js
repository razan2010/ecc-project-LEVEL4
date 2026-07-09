const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/customErrors');
const { multiplyPriceByQuantity } = require('../utils/priceCalculator');

exports.checkoutOrder = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const cart = await Cart.findOne({ userId }).populate('items.product');
  if (!cart || cart.items.length === 0) {
    throw new AppError('The checkout operational execution process failed: Cart is completely empty.', 400);
  }

  let totalPrice = 0;
  const orderItems = [];

  for (const item of cart.items) {
    const product = await Product.findById(item.product._id);
    
    if (!product || product.countInStock < item.quantity) {
      throw new AppError(`Stock conflict exception. ${product ? product.name : 'Targeted product reference'} has insufficient remaining balances.`, 400);
    }

    // Cost multi-unit calculator tool adjusts values proportionally depending on item count (2x, 3x, etc.)
    const itemTotalCost = multiplyPriceByQuantity(product.price, item.quantity);
    totalPrice += itemTotalCost;

    orderItems.push({
      product: product._id,
      quantity: item.quantity,
      priceAtPurchase: product.price
    });

    product.countInStock -= item.quantity;
    await product.save();
  }

  const order = new Order({ userId, items: orderItems, totalPrice });
  await order.save();
  await Cart.deleteOne({ userId });

  res.status(201).json({ success: true, message: 'Checkout finalized and order logged.', data: order });
});
// ADD TO THE ABSOLUTE BOTTOM OF src/controllers/ordersController.js
// 2. READ ALL ORDERS (ADMIN FEATURE)
exports.getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('items.product');
  res.status(200).json({ success: true, data: orders });
});

// 3. UPDATE ORDER STATUS (ADMIN FEATURE)
exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body; 

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!order) throw new AppError('Order not found.', 404);

  res.status(200).json({ success: true, message: 'Order status updated.', data: order });
});
