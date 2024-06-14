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
  sendOtp,
  verifyResetPasswordOtp,
} = require('../controllers/authController');

const { isAuthenticatedUser } = require('../middlewares/authentication');

router.route('/register').post(registerUser);
router.route('/register/otp').put(isAuthenticatedUser, sendOtp);
router.route('/verify/:otp').put(verifyEmail);
router.route('/login').post(loginUser);
router.route('/logout').get(isAuthenticatedUser, logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:otp').put(verifyResetPasswordOtp);
router.route('/password/reset').put(resetPassword);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);

module.exports = router;
