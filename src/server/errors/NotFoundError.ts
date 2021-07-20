import HttpStatus from 'http-status-codes';

import BaseError from './BaseError';

export default class NotFoundError extends BaseError {
  statusCode = HttpStatus.NOT_FOUND;

  constructor(message = 'Resource not found', errorCode = 'NOT_FOUND_ERROR') {
    super(message, errorCode);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
