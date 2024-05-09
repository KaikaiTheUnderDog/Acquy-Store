const express = require('express');
const router = express.Router();

const {
  getUserProfile,
  addShippingInfo,
  updateProfile,
} = require('../controllers/profileController');

const { isAuthenticatedUser } = require('../middlewares/authentication');

router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/shipping/add').put(isAuthenticatedUser, addShippingInfo);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);

module.exports = router;
