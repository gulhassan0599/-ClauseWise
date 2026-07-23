import logger from '../utils/logger.js';
import multer from 'multer';

// Global Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  logger.error(`Unhandled Exception: ${err.message}`, err);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';

  // Handle Multer and Upload-specific errors gracefully
  if (err instanceof multer.MulterError) {
    statusCode = 400; // Bad Request
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'File is too large. Maximum allowed size is 10MB.';
    }
  } else if (err.message.includes('Invalid file type')) {
    statusCode = 415; // Unsupported Media Type
    message = err.message;
  } else if (err.message.includes('only supports text-based PDFs')) {
    statusCode = 422; // Unprocessable Entity
    message = err.message;
  }

  res.status(statusCode).json({
    status: 'error',
    message: message,
    // Only show stack trace in development
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default errorHandler;
