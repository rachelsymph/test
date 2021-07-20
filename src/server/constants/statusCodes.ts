import HttpStatus from 'http-status-codes';

export const ERROR_CODES = [
  HttpStatus.BAD_GATEWAY,
  HttpStatus.BAD_REQUEST,
  HttpStatus.FORBIDDEN,
  HttpStatus.GATEWAY_TIMEOUT,
  HttpStatus.INTERNAL_SERVER_ERROR,
  HttpStatus.SERVICE_UNAVAILABLE,
  HttpStatus.UNAUTHORIZED,
];

export const WARNING_CODES = [HttpStatus.NOT_FOUND];
