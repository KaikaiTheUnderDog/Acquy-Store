const crypto = require('crypto');

const User = require('../models/user');

const sendToken = require('../utils/jsonWebToken');
const sendEmail = require('../utils/sendEmail');
const Errors = require('../utils/errors');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { userName, email, password } = req.body;

  try {
    const user = await User.create({
      userName,
      email,
      password,
    });

    // Tạo token xác nhận
    const verificationToken = user.createVerificationToken();

    // Lưu token và ngày hết hạn
    await user.save();

    // Gửi email xác nhận
    const verificationUrl = `http://localhost:8000/api/v1/verify/${verificationToken}`;
    const message = `Thank you for registering. Please click on the following link to verify your email address: \n\n${verificationUrl}`;

    await sendEmail({
      email: user.email,
      subject: 'Email Verification - Ryzel Store',
      message,
    });

    // Gọi sendToken sau khi gửi email thành công
    sendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
});

exports.verifyEmail = catchAsyncErrors(async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      registerToken: hashedToken,
      registerTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return next(new Errors('Verification token is invalid or expired', 400));
    }

    // Cập nhật isVerified và xóa thông tin token
    user.isVerified = true;
    user.registerToken = undefined;
    user.registerTokenExpiration = undefined;

    await user.save();

    // Gửi thông báo hoặc chuyển hướng đến trang xác nhận thành công
    res.status(200).json({
      success: true,
      message: 'Email verified successfully!',
    });
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

  // Get reset token
  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  // Create reset password URL
  const resetPasswordUrl = `http://localhost:8000/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow: \n\n${resetPasswordUrl}\n\nIf you haven't requested this email, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: '(no-reply) Password Reset Ryzel account',
      message,
    });

    res.status(200).json({
      success: true,
      message: `Password reset link sent to your email ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new Errors('Password reset token is invalid or expired', 400));
  }
});

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Hash URL token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new Errors('Password reset token is invalid or expired', 400));
  }

  if (req.body.password !== req.body.confirmedPassword) {
    return next(new Errors('Passwords do not match'), 400);
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Change password -> /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  console.log(req.user.id);
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
