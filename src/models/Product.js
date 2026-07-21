const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    required: true, 
    trim: true 
  },
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  stock: { 
    type: Number, 
    required: true, 
    min: 0, 
    default: 0 
  },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },
  images: { 
    type: [String], 
    default: [] 
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual attribute field handler calculating storage balances on the fly
productSchema.virtual('inStock').get(function() {
  return this.stock > 0;
});

module.exports = mongoose.model('Product', productSchema);
