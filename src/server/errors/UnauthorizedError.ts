import HttpStatus from 'http-status-codes';

import BaseError from './BaseError';

export default class UnauthorizedError extends BaseError {
  statusCode = HttpStatus.FORBIDDEN;

  constructor(message = 'Unauthorized', errorCode = 'UNAUTHORIZED_ERROR') {
    super(message, errorCode);

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
