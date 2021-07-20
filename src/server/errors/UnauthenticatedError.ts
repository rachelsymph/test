import HttpStatus from 'http-status-codes';

import BaseError from './BaseError';

export default class UnauthenticatedError extends BaseError {
  statusCode = HttpStatus.UNAUTHORIZED;

  constructor(
    message = 'Unauthenticated',
    errorCode = 'UNAUTHENTICATED_ERROR'
  ) {
    super(message, errorCode);

    Object.setPrototypeOf(this, UnauthenticatedError.prototype);
  }
}
