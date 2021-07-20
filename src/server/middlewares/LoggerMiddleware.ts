import { LoggingWinston } from '@google-cloud/logging-winston';
import { NextFunction, Request, Response } from 'express';
import get from 'lodash.get';

import { Indexable } from '../../commons/types/Indexable.type';
import config from '../config/config';
import { logger } from '../libs/Logger';

function cleanup(object: Indexable) {
  const newObject: Indexable = {};
  const excludedKeys = ['password'];

  Object.keys(object || {}).forEach((key) => {
    if (excludedKeys.includes(key)) {
      return;
    }

    newObject[key] = object[key];
  });

  return newObject;
}

export function requestDataLoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trace = get(req, 'headers.x-cloud-trace-context', null);

  if (trace) {
    req.log = logger.child({
      [LoggingWinston.LOGGING_TRACE_KEY]: `projects/${
        config.PROJECT_ID
      }/traces/${trace.match(/^([a-zA-Z0-9]*)/)[0]}`,
    });

    res.set('x-cloud-trace-context', trace);
  } else {
    req.log = logger as any;
  }

  req.log.info(`Query`, cleanup(req.query));
  req.log.info(`Body`, cleanup(req.body));
  req.log.info(`Params`, cleanup(req.params));

  next();
}
