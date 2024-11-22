const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('Missing Stripe Secret Key');
    return res.status(500).json({ error: 'Stripe configuration error' });
  }

  if (!process.env.CLIENT_URL) {
    console.error('Missing Client URL');
    return res.status(500).json({ error: 'Client configuration error' });
  }

  try {
    const { quantity, productId, price, name } = req.body;

    // Validate required fields
    if (!quantity || !price || !name) {
      return res.status(400).json({ error: 'Missing required fields in request body' });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: name,
            },
            unit_amount: Math.round(price * 100), // Convert price to cents
          },
          quantity: quantity,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Stripe error:', error.message);
    res.status(500).json({
      error: 'Error creating checkout session',
      details: error.message,
    });
  }
};
