

exports.sendErrorResponse = (res, statusCode, message, options) => {
    return res.status(statusCode).json({
      success: false,
      message,
      ...options
    });
  };