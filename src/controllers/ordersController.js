const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/customErrors');
const { multiplyPriceByQuantity } = require('../utils/priceCalculator');

exports.checkoutOrder = asyncHandler(async (req, res) => {
  const { userId, shippingAddress } = req.body;
  const targetUser = userId || "customer_99";

  const cart = await Cart.findOne({ user: targetUser }).populate('items.product');
  if (!cart || cart.items.length === 0) {
    throw new AppError('Checkout failed: Shopping cart is completely empty.', 400);
  }

  let totalPrice = 0;
  const orderItems = [];

  for (const item of cart.items) {
    const product = await Product.findById(item.product._id);
    
    if (!product || product.stock < item.quantity) {
      throw new AppError(`Stock deficit error: ${product ? product.name : 'Product'} has insufficient stock.`, 400);
    }

    const itemTotalCost = multiplyPriceByQuantity(product.price, item.quantity);
    totalPrice += itemTotalCost;

    orderItems.push({
      product: product._id,
      name: product.name,
      quantity: item.quantity,
      price: product.price
    });

    product.stock -= item.quantity;
    await product.save();
  }

  const generatedOrderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();

  const order = new Order({
    orderNumber: generatedOrderNumber,
    userId: targetUser,
    items: orderItems,
    totalPrice,
    shippingAddress: shippingAddress || { street: "123 Main St", city: "Cairo", country: "Egypt" }
  });

  await order.save();
  await Cart.deleteOne({ user: targetUser });

  res.status(201).json({ success: true, message: 'Order created successfully', data: order });
});

exports.getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  res.status(200).json({ success: true, data: orders });
});

exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) throw new AppError('Order not found.', 404);
  res.status(200).json({ success: true, data: order });
});

exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
  if (!order) throw new AppError('Order not found.', 404);
  res.status(200).json({ success: true, message: 'Order status updated.', data: order });
});
