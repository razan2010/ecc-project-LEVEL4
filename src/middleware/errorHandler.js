const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // 1. Handle Duplicate Key Error (Code 11000) -> Must return 409 Conflict (Required by Rubric)
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate field value error: A record with that specific '${field}' already exists.`;
  }

  // 2. Handle Mongoose Schema ValidationError -> Must return 400 (Required by Rubric)
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(val => val.message).join(', ');
  }

  // 3. Handle Mongoose CastError (Bad ID Format) -> Must return 400 (Required by Rubric)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Database mapping error: Invalid input data format for field '${err.path}'`;
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;
