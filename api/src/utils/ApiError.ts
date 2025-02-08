class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;
  details?: Record<string, string>;
  constructor(
    statusCode: number,
    message: string,
    details?: Record<string, string>,
    isOperational = true,
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details || {};

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
