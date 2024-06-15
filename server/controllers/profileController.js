const User = require('../models/user');

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary').v2;

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

// Update user's profile -> /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserProfile = {
    userName: req.body.userName,
    gender: req.body.gender,
  };

  const dob = new Date(req.body.birthday);

  if (Object.prototype.toString.call(dob) === '[object Date]') {
    if (!isNaN(dob)) {
      newUserProfile.dob = dob;
    }
  }

  // Update avatar
  if (req.body.uploadedAvatar) {
    const user = await User.findById(req.user.id);

    const image_id = user.avatar.public_id;
    const res = await cloudinary.uploader.destroy(image_id);

    const result = await cloudinary.uploader.upload(req.body.uploadedAvatar, {
      folder: 'avatars',
      width: 150,
      crop: 'scale',
    });

    newUserProfile.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserProfile, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// Get user's favorite products -> /api/v1/me/favorites
exports.getFavoriteProducts = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: 'favoriteProducts',
    model: 'Product',
  });

  if (!user) {
    return next(new Errors('User not found', 404));
  }

  res.status(200).json({
    success: true,
    favoriteProducts: user.favoriteProducts,
  });
});
