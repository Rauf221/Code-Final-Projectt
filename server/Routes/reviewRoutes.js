const express = require('express');
const { createReview, getReviews } = require('../Controllers/reviewController');

const router = express.Router();


router.post('/', createReview);

router.get('/', getReviews);

module.exports = router;
