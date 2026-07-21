const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  items: [orderItemSchema],
  totalPrice: { type: Number, required: true },
  status: { 
    type: String, 
    default: 'pending', 
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'] 
  },
  shippingAddress: {
    street: { type: String, default: "123 Main St" },
    city: { type: String, default: "Cairo" },
    country: { type: String, default: "Egypt" }
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
