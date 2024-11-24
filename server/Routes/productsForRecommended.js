const express = require('express');
const {
  getAllRecommendedProducts,
  getRecommendedProductById,
  createRecommendedProduct,
  updateRecommendedProduct,
  deleteRecommendedProduct,
  getRecommendedProductBySlug
} = require('../Controllers/productsForRecommended');

const router = express.Router();

router.get('/recommendedproducts', getAllRecommendedProducts);
router.get('/recommendedproducts/:id', getRecommendedProductById);
router.post('/recommendedproducts', createRecommendedProduct);
router.get('/recommendedproducts/slug/:slug', getRecommendedProductBySlug);
router.put('/recommendedproducts/:id', updateRecommendedProduct);
router.delete('/recommendedproducts/:id', deleteRecommendedProduct);

module.exports = router;
