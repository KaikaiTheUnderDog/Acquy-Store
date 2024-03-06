const Errors = require('../utils/errors');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    console.log(err);

    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === 'PRODUCTION') {
    let error = { ...err };
    error.message = err.message;

    // Wrong Mongoose object's id error
    if (err.name === 'CastError') {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new Errors(message, 400);
    }

    // Handle Mongoose validation error
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new Errors(message, 400);
    }

    // Handle Mongoose duplicate key errors
    if (err.code === 11000) {
      const message = `${Object.keys(err.keyValue)} already exists.`;
      error = new Errors(message, 400);
    }

    // Handle wrong JSON Web Token
    if (err.name === 'JsonWebTokenError') {
      const message = 'Token is invalid. Try again!';
      error = new Errors(message, 400);
    }

    // Handle expired JSON Web Token
    if (err.name === 'TokenExpiredError') {
      const message =
        'Your reset password token has expired. Please try again!';
      error = new Errors(message, 400);
    }

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};
