import HttpStatus from 'http-status-codes';

import BaseError from './BaseError';

export default class BadGatewayError extends BaseError {
  statusCode = HttpStatus.BAD_GATEWAY;

  constructor(message = 'Bad Gateway', errorCode = 'BAD_GATEWAY_ERROR') {
    super(message, errorCode);

    Object.setPrototypeOf(this, BadGatewayError.prototype);
  }
}
