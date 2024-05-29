const express = require('express');
const router = express.Router();

const {
  getDashboardData,
  getAllOrders,
  updatePendingOrders,
  deleteOrder,
  getAdminProducts,
  getNewUserData,
  updateProduct,
  deleteProduct,
  newProduct,
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
router
  .route('/admin/products/new')
  .post(isAuthenticatedUser, authorizeRole('admin'), newProduct);
router
  .route('/admin/product/:id')
  .put(isAuthenticatedUser, authorizeRole('admin'), updateProduct)
  .delete(isAuthenticatedUser, authorizeRole('admin'), deleteProduct);
router
  .route('/admin/products')
  .get(isAuthenticatedUser, authorizeRole('admin'), getAdminProducts);
router
  .route('/admin/users/count')
  .get(isAuthenticatedUser, authorizeRole('admin'), getNewUserData);

module.exports = router;
