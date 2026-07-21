const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true } 
});

const cartSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true }, 
  items: [cartItemSchema],
  totalPrice: { type: Number, required: true, default: 0 } // Required by your slide schema
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
