import HttpStatus from 'http-status-codes';

import BaseError from './BaseError';

export default class BadRequestError extends BaseError {
  statusCode = HttpStatus.BAD_REQUEST;

  constructor(message = 'Bad Request', errorCode = 'BAD_REQUEST_ERROR') {
    super(message, errorCode);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
