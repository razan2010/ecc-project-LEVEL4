const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  description: { 
    type: String, 
    trim: true
  },
  slug: { 
    type: String, 
    unique: true,
    lowercase: true
  }
}, { 
  timestamps: true 
});


categorySchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') 
      .replace(/\s+/g, '-');        
  }
  return;
});

module.exports = mongoose.model('Category', categorySchema);
