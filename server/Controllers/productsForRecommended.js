const RecommendedProduct = require('../Models/productsForRecommended');

exports.getAllRecommendedProducts = async (req, res) => {
  try {
    const recommendedProducts = await RecommendedProduct.find();
    res.status(200).json(recommendedProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRecommendedProductById = async (req, res) => {
  try {
    const recommendedProduct = await RecommendedProduct.findById(req.params.id);
    if (!recommendedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(recommendedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createRecommendedProduct = async (req, res) => {
  try {
    const newRecommendedProduct = new RecommendedProduct(req.body);
    await newRecommendedProduct.save();
    res.status(201).json(newRecommendedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRecommendedProduct = async (req, res) => {
  try {
    const updatedRecommendedProduct = await RecommendedProduct.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRecommendedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(updatedRecommendedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRecommendedProduct = async (req, res) => {
  try {
    const deletedRecommendedProduct = await RecommendedProduct.findByIdAndDelete(req.params.id);
    if (!deletedRecommendedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 

exports.getRecommendedProductBySlug = async (req, res) => {
  try {
    const recommendedProduct = await RecommendedProduct.findOne({ slug: req.params.slug }); 
    if (!recommendedProduct) {
      return res.status(404).json({ message: 'Recommended Product not found' });
    }
    res.status(200).json(recommendedProduct); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

