const express = require('express');
const router = express.Router();

const {
  getUserProfile,
  addShippingInfo,
} = require('../controllers/profileController');

const { isAuthenticatedUser } = require('../middlewares/authentication');

router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/shipping/add').put(isAuthenticatedUser, addShippingInfo);

module.exports = router;
