const crypto = require('crypto');
const cloudinary = require('cloudinary').v2;

const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes } = require('firebase/storage');

const User = require('../models/user');

const sendToken = require('../utils/jsonWebToken');
const sendEmail = require('../utils/sendEmail');
const Errors = require('../utils/errors');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { log } = require('console');

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { userName, email, password, avatar } = req.body;

    const result = await cloudinary.uploader.upload(avatar, {
      folder: 'avatars',
      width: 150,
      crop: 'scale',
    });

    const user = await User.create({
      userName,
      email,
      password,
      avatar: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    await user.save();

    sendToken(user, 200, res);
  } catch (error) {
    return next(new Errors(error.message, 400));
  }
});

exports.sendOtp = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      //Tạo OTP
      const otp = user.createRegisterOtp();

      user.save();

      // Gửi email xác nhận
      const message = `Thank you for registering. Please enter the following OTP in register screen to verify your account: \n\n${otp}`;

      await sendEmail({
        email: user.email,
        subject: 'Register Verification OTP - Ryzel Store',
        message,
      });
    } else {
      return next(new Errors('User not found', 400));
    }

    res.status(200).json({
      mailSent: true,
    });
  } catch (error) {
    return next(new Errors(error.message, 400));
  }
});

exports.verifyEmail = catchAsyncErrors(async (req, res, next) => {
  try {
    const otp = Number(req.params.otp);

    const user = await User.findOne({
      registerOtp: otp,
      registerOtpExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(new Errors('OTP is invalid or expired', 400));
    }

    // Cập nhật isVerified và xóa thông tin token
    user.isVerified = true;
    user.registerOtp = undefined;
    user.registerOtpExpires = undefined;

    await user.save();

    // Gửi thông báo hoặc chuyển hướng đến trang xác nhận thành công
    res.status(200).json({
      success: true,
    });

    sendToken(user, 200, res);
  } catch (error) {
    return next(new Errors(error.message, 400));
  }
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password is entered by user
  if (!email || !password) {
    return next(new Errors('Please enter email & password', 400));
  }

  // Find user in database
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new Errors('Invalid email or password', 400));
  }

  // Check if password is correct
  const isPasswordMatch = await user.checkPassword(password);

  if (!isPasswordMatch) {
    return next(new Errors('Invalid email or password', 400));
  }

  sendToken(user, 200, res);
});

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new Errors('Invalid email', 404));
  }

  const otp = user.createResetPasswordOtp();

  await user.save({ validateBeforeSave: false });

  const message = `Your password reset OTP is as follow: \n\n${otp}\n\nIf you haven't requested this email, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: '(no-reply) Password Reset Ryzel account',
      message,
    });

    res.status(200).json({
      mailSent: true,
    });
  } catch (error) {
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new Errors('Password reset token is invalid or expired', 400));
  }
});

exports.verifyResetPasswordOtp = catchAsyncErrors(async (req, res, next) => {
  try {
    const otp = Number(req.params.otp);

    const user = await User.findOne({
      resetPasswordOtp: otp,
      resetPasswordOtpExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(new Errors('OTP is invalid or expired', 400));
    }

    // Cập nhật isVerified và xóa thông tin token
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpires = undefined;

    await user.save();

    // Gửi thông báo hoặc chuyển hướng đến trang xác nhận thành công
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new Errors(error.message, 400));
  }
});

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return next(new Errors('Fatal error', 400));
  }

  // Set new password
  user.password = req.body.password;

  await user.save();

  res.status(200).json({
    success: true,
  });
});

// Change password -> /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check old user's password
  const isMatched = await user.checkPassword(req.body.currentPassword);
  if (!isMatched) {
    return next(new Errors('Invalid current password', 400));
  }

  user.password = req.body.password;
  await user.save();

  sendToken(user, 200, res);
});
