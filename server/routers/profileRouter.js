const express = require('express');
const router = express.Router();

const { getUserProfile } = require('../controllers/profileController');

const { isAuthenticatedUser } = require('../middlewares/authentication');

router.route('/me').get(getUserProfile, isAuthenticatedUser);

module.exports = router;
