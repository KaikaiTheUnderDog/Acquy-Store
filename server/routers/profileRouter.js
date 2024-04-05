const express = require('express');
const router = express.Router();

const { getUserProfile } = require('../controllers/profileController');

const { isAuthenticatedUser } = require('../middlewares/authentication');

router.route('/me').get(isAuthenticatedUser, getUserProfile);

module.exports = router;
