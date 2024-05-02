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

// Create shipping information --> /api/v1/shipping/add
exports.addShippingInfo = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  const { receiver, phoneNo, country, city, address, postalCode } = req.body;
  console.log({ receiver, phoneNo, country, city, address, postalCode });

  user.shippingInfo = [
    ...user.shippingInfo,
    { receiver, phoneNo, country, city, address, postalCode },
  ];
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    user,
  });
});
