const express = require('express');
const router = express.Router();

const { createOrder, getSingleOrder, getMyOrders, getAllOrders, updatePendingOrders, deleteOrder } = require('../controllers/orderController');

const { isAuthenicatedUser, authorizedRoles } = require('../middlewares/auth');

router.route('/order/new').post(isAuthenicatedUser, createOrder);
router.route('/order/:id').get(isAuthenicatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenicatedUser, getMyOrders);
router.route('/admin/order').get(isAuthenicatedUser, authorizedRoles('admin'), getAllOrders);
router.route('/admin/order/:id').put(isAuthenicatedUser, authorizedRoles('admin'), updatePendingOrders)
                                .delete(isAuthenicatedUser, authorizedRoles('admin'), deleteOrder);

module.exports = router;
