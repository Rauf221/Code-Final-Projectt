const mongoose = require('mongoose');

const filterProductsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, default: null },
    discount: { type: String, default: null },
    reviewCount: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    actionButtonText: { type: String, required: true },
    category: { type: String, required: true },
    color: { type: String, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true },
    hoverImage: { type: String, default: null },
    size: { type: String, default: null },  
    availability: { type: String, default: 'In Stock' },
    specialTag: { type: String, default: null },
    countdown: {
      days: { type: Number, default: 0 },
      hours: { type: Number, default: 0 },
      minutes: { type: Number, default: 0 },
      seconds: { type: Number, default: 0 }
    }
  }, { timestamps: true });
  

module.exports = mongoose.model('FilterProducts', filterProductsSchema);
