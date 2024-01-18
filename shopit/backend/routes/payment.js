const express = require('express')
const router = express.Router();

const {
    processPayment,
    sendStripApi
} = require('../controllers/paymentController')

const { isAuthenicatedUser } = require('../middlewares/auth')

router.route('/payment/process').post(isAuthenicatedUser, processPayment);
router.route('/stripeapi').get(isAuthenicatedUser, sendStripApi);

module.exports = router;