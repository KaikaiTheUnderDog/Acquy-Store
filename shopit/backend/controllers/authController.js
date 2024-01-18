const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const crypto = require('crypto');
const cloudinary = require('cloudinary')

const sendToken = require("../utils/jwtCookie");
const sendEmail = require("../utils/sendEmail");

exports.registerUser = catchAsyncError(async (req, res, next) => {

  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'avatars',
    width: 150,
    crop: "scale"
  },
    function (error, result) { console.log(result); })

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url
    }
  })

  sendToken(user, 200, res);
})

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler('Please enter Email and Password'), 400)
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    return next(new ErrorHandler('Invalid Email or Password'), 401)
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid Password'), 402)
  }

  sendToken(user, 200, res);

})

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler('Invalid Email or Password'), 401)
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });
  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  const message = `Your reset token is in the follow:\n${resetUrl}\nPlease ignore this if you not requested it`

  try {
    await sendEmail({
      email: user.email,
      subject: "ShopIT recovery email",
      message
    })

    res.status(200).json({
      success: true,
      message: `Email has been sent to: ${user.email}`
    })
  }
  catch (error) {
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message), 500)
  }
})

exports.getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
})

exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserProfile = {
    name: req.body.name,
    email: req.body.email,
  };
  if (req.body.avatar !== '') {
    const user = await User.findById(req.user.id)

    const image_id = user.avatar.public_id
    const res = await cloudinary.v2.uploader.destroy(image_id)
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
      width: 150,
      crop: "scale"
    })
    newUserProfile.avatar = {
      public_id: result.public_id,
      url: result.secure_url
    }
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

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check old user's password
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler('Invalid old password', 400));
  }

  user.password = req.body.password;
  await user.save();

  sendToken(user, 200, res);
})


exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  })

  if (!user) {
    return next(new ErrorHandler('Token is invalid or expired'), 401)
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password not match'), 401)
  }

  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;

  await user.save();

  sendToken(user, 200, res);
})

exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie('Token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  }),
    res.status(200).json({
      success: true,
      message: 'Logged Out'
    })
})

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateUser = catchAsyncError(async (req, res, next) => {
  const updatedUser = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, updatedUser, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// Delete user -> /api/v1/admin/users/:id
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  console.log(user)

  if (!user) {
    return next(new ErrorHandler('User is not found'));
  }

  const image_id = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(image_id);

  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
  });
});