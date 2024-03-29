/* global __dirname */

import fs from 'fs';
import path from 'path';

import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import HttpStatus from 'http-status-codes';
import passport from 'passport';
import swagger from 'swagger-ui-express';

import { ErrorResponse } from 'src/commons/types/ErrorResponse.type';
import config from 'src/server/config/config';
import BaseError from 'src/server/errors/BaseError';
import NotFoundError from 'src/server/errors/NotFoundError';
import { logger } from 'src/server/libs/Logger';
import { configurePassport } from 'src/server/libs/Passport';
import { requestDataLoggerMiddleware } from 'src/server/middlewares/LoggerMiddleware';
import router from 'src/server/routes';
import makeAuthRoutes from 'src/server/routes/AuthRoute';
import healthRoutes from 'src/server/routes/HealthRoute';
import swaggerDoc from 'src/server/swagger.json';

async function main() {
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  app.use(express.json());
  app.use(express.raw({ type: 'application/octet-stream' }));
  app.use(express.urlencoded({ extended: false }));
  app.use(
    cors({
      credentials: true,
      origin: config.ACCESS_CONTROL_ORIGIN_URLS,
    })
  );
  app.use(
    helmet({
      hsts: {
        maxAge: 86400,
      },
    })
  );

  app.use(
    cookieSession({
      secret: config.SECRET_CODE,
      maxAge: config.SESSION_MAX_AGE,
    })
  );
  app.use(cookieParser(config.SECRET_CODE));
  app.use(passport.initialize());
  app.use(passport.session());

  configurePassport(passport);

  if (config.SWAGGER === 'true') {
    app.use('/api-docs', swagger.serve, swagger.setup(swaggerDoc));
  }

  // request data logger
  app.use(requestDataLoggerMiddleware);

  if (!config.IS_PROD) {
    app.use(logger.getLoggerMiddleware());
  }

  // health routes
  app.use('/api/1.0/health/live', healthRoutes.isLive);
  app.use('/api/1.0/health/ready', healthRoutes.isReady);

  // api routes
  app.use('/api/1.0/auth', makeAuthRoutes(passport));
  app.use('/api/1.0', router);

  // static files
  app.use(
    '/static',
    express.static(path.join(__dirname, '../../build/static'))
  );

  // catch all routes
  app.use('^/$', (req, res, next) => {
    fs.readFile(
      path.join(__dirname, '../../build/index.html'),
      'utf-8',
      (err, data) => {
        if (err) {
          logger.error(err.message);

          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Errors');
        }

        return res.send(data);
      }
    );
  });

  app.use((req, res, next) => {
    next(new NotFoundError());
  });

  app.use(handleError);

  return app;
}

function handleError(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

  let errorResponse: ErrorResponse = {
    error: {
      code: 'ERROR',
      message: err.message || 'Something went wrong!',
    },
  };

  if (err instanceof BaseError) {
    statusCode = err.statusCode;
    errorResponse = err.errorResponse;
  }

  res.status(statusCode).send(errorResponse);
}

export default main;
