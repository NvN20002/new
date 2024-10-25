const ErrorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;

  res.status(statusCode).json({
    statuscode:statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default ErrorHandler;
