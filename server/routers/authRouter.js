const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
  logoutUser,
  updatePassword,
} = require('../controllers/authController');

const { isAuthenticatedUser } = require('../middlewares/authentication');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/verify/:token').put(verifyEmail);
router.route('/password/update').put(updatePassword);

module.exports = router;
