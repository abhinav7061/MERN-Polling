const { sendErrorResponse } = require("./erroHandle");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal server error';

  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid ID: ${err.value}`;
    return sendErrorResponse(res, 400, message);
  }

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} is entered`;
    return sendErrorResponse(res, 400, message);
  }

  if (err.name === 'JsonWebTokenError') {
    const message = 'Json web token is invalid. Please try again.';
    return sendErrorResponse(res, 400, message);
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Json web token is expired. Please try again.';
    return sendErrorResponse(res, 400, message);
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    return sendErrorResponse(res, 400, message);
  }

  sendErrorResponse(res, err.statusCode, err.message);
};
