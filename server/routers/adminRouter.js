const express = require('express');
const router = express.Router();

const {
  getDashboardData,
  getAllOrders,
  updatePendingOrders,
  deleteOrder,
} = require('../controllers/adminController');

const {
  isAuthenticatedUser,
  authorizeRole,
} = require('../middlewares/authentication');

router
  .route('/admin/dashboard')
  .get(isAuthenticatedUser, authorizeRole('admin'), getDashboardData);
router
  .route('/admin/orders')
  .get(isAuthenticatedUser, authorizeRole('admin'), getAllOrders);
router
  .route('/admin/order/:id')
  .put(isAuthenticatedUser, authorizeRole('admin'), updatePendingOrders)
  .delete(isAuthenticatedUser, authorizeRole('admin'), deleteOrder);

module.exports = router;
