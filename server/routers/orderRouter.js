const express = require('express');
const router = express.Router();

const {
  createOrder,
  getSingleOrder,
  getMyOrders,
  getAllOrders,
  updatePendingOrders,
  deleteOrder,
  cancelOrder,
} = require('../controllers/orderController');

const { isAuthenticatedUser } = require('../middlewares/authentication');

router.route('/order/new').post(isAuthenticatedUser, createOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, getMyOrders);
router.route('/admin/orders').get(isAuthenticatedUser, getAllOrders);
router
  .route('/admin/order/:id')
  .put(isAuthenticatedUser, updatePendingOrders)
  .delete(isAuthenticatedUser, deleteOrder);
router.put('/order/:id/cancel', isAuthenticatedUser, cancelOrder);

module.exports = router;
