const mongoose = require("mongoose");

const RecommendedSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  oldPrice: { type: String },
  discount: { type: Number },
  image: { type: String, required: true },
  hoverImage: { type: String, required: true },
  slug: { type: String, required: true },
  reviews: { type: Number, required: true },
  rating: { type: Number, required: true },
});

module.exports = mongoose.model("RecommendedProduct", RecommendedSchema);
