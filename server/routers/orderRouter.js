const express = require('express');
const router = express.Router();

const {
  createOrder,
  getSingleOrder,
  getMyOrders,
  cancelOrder,
} = require('../controllers/orderController');

const { isAuthenticatedUser } = require('../middlewares/authentication');

router.route('/order/new').post(isAuthenticatedUser, createOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, getMyOrders);
router.route('/order/:id/cancel').put(isAuthenticatedUser, cancelOrder);

module.exports = router;
