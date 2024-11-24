const express = require('express');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductBySlug } = require('../Controllers/product');
const router = express.Router();

router.get('/products', getAllProducts);

router.get('/products/:id', getProductById);

router.get('/products/slug/:slug', getProductBySlug);

router.post('/products', createProduct);

router.put('/products/:id', updateProduct);

router.delete('/products/:id', deleteProduct);

module.exports = router;
