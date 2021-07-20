import { NextFunction, Response, Request } from 'express';
import HttpStatus from 'http-status-codes';

import UnauthorizedError from '../errors/UnauthorizedError';
import { logger } from '../libs/Logger';

async function validateCronOrigin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.get('X-Appengine-Cron') !== 'true') {
      return res.sendStatus(HttpStatus.BAD_REQUEST).end();
    }

    next();
  } catch (error) {
    logger.error('Unauthorized error', error);

    next(new UnauthorizedError());
  }
}

export default {
  validateCronOrigin,
};
