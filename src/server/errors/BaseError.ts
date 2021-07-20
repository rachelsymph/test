import HttpStatus from 'http-status-codes';

import { ErrorResponse } from '../../commons/types/ErrorResponse.type';

export default class BaseError extends Error {
  statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  errorCode: string;

  constructor(message = 'Something went wrong!', errorCode = 'ERROR') {
    super(message);
    this.name = this.constructor.name;
    this.errorCode = errorCode;

    Error.captureStackTrace(this, this.constructor);
  }

  get errorResponse(): ErrorResponse {
    return {
      error: {
        code: this.errorCode,
        message: this.message,
      },
    };
  }
}
