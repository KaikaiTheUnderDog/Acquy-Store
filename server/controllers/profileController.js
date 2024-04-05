const User = require('../models/user');

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Get currently logged in user's profile -> /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});
