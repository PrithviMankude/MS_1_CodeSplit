/* Common Error handler */
const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORIZED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

//Generic Error handler
class AppError extends Error {
  constructor(
    name,
    statusCode,
    description,
    issOperational,
    errorStack,
    logingErrorResponse
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.issOperational = issOperational;
    this.errorStack = errorStack;
    this.logError = logingErrorResponse;
    Error.captureStackTrace(this);
  }
}

//API specific errors
class APIError extends AppError {
  constructor(
    name,
    statusCode = STATUS_CODES.INTERNAL_ERROR,
    description = "Internal Server Error",
    isOperational = true
  ) {
    super(name, statusCode, description, isOperational);
  }
}

class BadRequestError extends AppError {
  constructor(description = "Bad Request", logingErrorResponse) {
    super(
      "NOT_FOUND",
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      false,
      logingErrorResponse
    );
  }
}

class ValidationError extends AppError {
  constructor(description = "Validation Eror", errorStack) {
    super(
      "BAD_REQUEST",
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      errorStack
    );
  }
}

module.exports = {
  AppError,
  APIError,
  BadRequestError,
  ValidationError,
  STATUS_CODES,
};
