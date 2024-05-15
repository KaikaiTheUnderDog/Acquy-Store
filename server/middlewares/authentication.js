const catchAsyncErrors = require('./catchAsyncErrors');
const Errors = require('../utils/errors');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// Check if the user is authenticated
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new Errors('Please sign in first to continue', 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  next();
});

// Authorize user's roles
exports.authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role ${req.user.role} is not authorized to access this resource`,
          403
        )
      );
    }

    next();
  };
};
