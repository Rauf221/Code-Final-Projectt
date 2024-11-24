const rateLimit = require('express-rate-limit');

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: {
    status: 'error',
    message: 'Too many contact submissions, please try again later'
  }
});

module.exports = contactLimiter;