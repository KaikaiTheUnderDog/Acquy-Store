const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserProfile, updatePassword, updateProfile, getAllUsers, getUserDetails, updateUser, deleteUser } = require('../controllers/authController')
const { isAuthenicatedUser, authorizedRoles} =require('../middlewares/auth')
router.route('/register').post(registerUser);
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/login').post(loginUser);
router.route('/logout').post(logout);
router.route('/me').get(isAuthenicatedUser, getUserProfile);
router.route('/me/update').put(isAuthenicatedUser, updateProfile);
router.route('/password/update').put(isAuthenicatedUser, updatePassword);

router.route('/admin/users').get(isAuthenicatedUser, authorizedRoles('admin'), getAllUsers);
router.route('/admin/user/:id').get(isAuthenicatedUser, authorizedRoles('admin'), getUserDetails)
                               .put(isAuthenicatedUser, authorizedRoles('admin'), updateUser)
                               .delete(isAuthenicatedUser, authorizedRoles('admin'), deleteUser)
module.exports = router;