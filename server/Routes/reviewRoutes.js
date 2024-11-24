const express = require('express');
const { createReview, getReviews, deleteReview } = require('../Controllers/reviewController');

const router = express.Router();


router.post('/', createReview);
router.delete('/:id', deleteReview);
router.get('/', getReviews);

module.exports = router;
