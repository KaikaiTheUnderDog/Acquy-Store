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
