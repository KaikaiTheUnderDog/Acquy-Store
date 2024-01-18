const catchAsyncError = require('../middlewares/catchAsyncError')

const stripe = require('stripe')('sk_test_51OGQUzARMTmTyVNbKXsTOpXrMaVXH74OP0JdNs4x90jusHlHUqY9iDK0qIyBe8rrKfsHORflEABFRlC17ano7zvR00ovdNDolC');

// Process stripe payments   =>   /api/v1/payment/process
exports.processPayment = catchAsyncError(async (req, res, next) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',

        metadata: { integration_check: 'accept_a_payment' }
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })

})

// Send stripe API Key   =>   /api/v1/stripeapi
exports.sendStripApi = catchAsyncError(async (req, res, next) => {

    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })

})