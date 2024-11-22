const express = require('express');
const { createCheckoutSession } = require('../Controllers/stripeController');
const router = express.Router();

// Route to create a Stripe Checkout session
router.post('/create-checkout-session', createCheckoutSession);

module.exports = router;