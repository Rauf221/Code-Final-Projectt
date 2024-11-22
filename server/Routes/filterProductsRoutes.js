const express = require('express');
const filterProductsController = require('../Controllers/filterProductsController');

const router = express.Router();

// Routes for FilterProducts
router.get('/', filterProductsController.getAllFilteredProducts);
router.get('/:id', filterProductsController.getFilterProductById);
router.post('/', filterProductsController.createFilterProduct);
router.put('/:id', filterProductsController.updateFilterProduct);
router.delete('/:id', filterProductsController.deleteFilterProduct);

module.exports = router;
