const express = require('express');
const router = express.Router();

const {
  getUserProfile,
  addShippingInfo,
  updateProfile,
  getFavoriteProducts,
} = require('../controllers/profileController');

const { isAuthenticatedUser } = require('../middlewares/authentication');

router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/shipping/add').put(isAuthenticatedUser, addShippingInfo);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);
router.route('/me/favorites').get(isAuthenticatedUser, getFavoriteProducts);

module.exports = router;
