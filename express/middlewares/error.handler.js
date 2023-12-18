// Middleware errorHandler: Handles errors and sends a JSON response with detailed error information.
function errorHandler(err, req, res, _) {
  // Builds a JSON object with the error message and stack trace.
  res.json({
    message: err.message, // Descriptive error message.
    stack: err.stack, // Error stack trace.
  });
}

// Middleware boomErrorHandler: Handles Boom errors and sends a JSON response with error details.
function boomErrorHandler(err, req, res, next) {
  // Check if the error is a Boom error (HTTP-friendly error utility).
  if (err.isBoom) {
    // Extracts the output details from the Boom error.
    const { output } = err;
    // Sets the HTTP status code and sends a JSON response with payload.
    res.status(output.statusCode).json(output.payload);
  } else {
    // If the error is not a Boom error, passes it to the next error handler.
    next(err);
  }
}

module.exports = { errorHandler, boomErrorHandler };
