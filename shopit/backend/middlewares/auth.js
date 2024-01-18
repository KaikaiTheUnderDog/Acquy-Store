const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");

exports.isAuthenicatedUser = catchAsyncError (async (req, res, next) => {

    const token = req.cookies.Token
    if(!token) {
        return next(new ErrorHandler("Login to see this resource", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)

    next();
})


exports.authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access!`, 403))
        }
        next()
    }
}