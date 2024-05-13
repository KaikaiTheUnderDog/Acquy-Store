const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Errors = require('../utils/errors');

const stripe = require('stripe')(
  'sk_test_51Ow6TsEecL1yXLFJCXO6cc84AAj46DUyDGnBG7Yb3EhL7jWFxmEJoVCYhTOnNjaKFWOeRCjNg9yy5v7Bvy5NuDIs007OgDdNFo'
);

// Process stripe payments   =>   /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log('hello');
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    return next(new Errors(error.message, 400));
  }
});

// Send stripe API Key   =>   /api/v1/stripeapi
exports.sendStripeApi = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeAPIKey: process.env.STRIPE_API_KEY,
  });
});
