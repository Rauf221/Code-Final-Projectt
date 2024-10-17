const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  label: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: String, required: true },
  oldPrice: { type: String },
  discount: { type: Number },
  isNew: { type: Boolean, default: false },
  isHot: { type: Boolean, default: false },
  isSubscription: { type: Boolean, default: false },
  image: { type: String, required: true },
  hoverImage: { type: String, required: true },
  brand: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema);
