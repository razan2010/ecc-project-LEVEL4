const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Product name configuration is required"], 
    trim: true 
  },
  description: { 
    type: String, 
    required: [true, "Product description configuration is required"], 
    trim: true 
  },
  price: { 
    type: Number, 
    required: [true, "Price parameter must be a valid positive decimal number"], 
    min: 0 
  },
  stock: { 
    type: Number, 
    required: [true, "Stock allocation level must be a non-negative whole integer"], 
    min: 0, 
    default: 0 
  },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: [true, "Invalid reference Category database target identity ID structure"] 
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

productSchema.virtual('inStock').get(function() {
  return this.stock > 0;
});

module.exports = mongoose.model('Product', productSchema);
