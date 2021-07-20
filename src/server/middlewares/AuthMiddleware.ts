import { NextFunction, Response, Request } from 'express';

import UnauthenticatedError from '../errors/UnauthenticatedError';
import { logger } from '../libs/Logger';

export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) {
      throw new UnauthenticatedError();
    }

    next();
  } catch (error) {
    logger.warn('Authentication error', error);

    next(new UnauthenticatedError());
  }
}
