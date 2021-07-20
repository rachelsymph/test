import HttpStatus from 'http-status-codes';

import BaseError from './BaseError';

export default class ConflictError extends BaseError {
  statusCode = HttpStatus.CONFLICT;

  constructor(message = 'Conflict', errorCode = 'CONFLICT_ERROR') {
    super(message, errorCode);
  }
}
