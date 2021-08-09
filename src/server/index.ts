/* global process */

import 'reflect-metadata';
import fs from 'fs';
import http from 'http';
import https from 'https';

import makeApp from './app';
import config from './config/config';
import { logger } from './libs/Logger';
import { createLegacyDbConnection } from './utils/DbConnectionUtils';

let server: any;

(async function () {
  await createLegacyDbConnection();

  const app = await makeApp();

  if (config.HTTPS === 'true') {
    const key = fs.readFileSync('localhost-key.pem', 'utf8');
    const cert = fs.readFileSync('localhost.pem', 'utf8');
    const credentials = { key, cert };

    server = https.createServer(credentials, app);
  } else {
    server = http.createServer(app);
  }

  server.listen(config.PORT, () => {
    logger.debug('Initializing server');
    logger.debug('Migrating database');
    logger.debug(
      `Server ready to serve traffic https://${config.HOST}:${config.PORT}`
    );
  });
})();

process.on('uncaughtException', handleUncaughtException);
process.on('unhandledRejection', handleUnhandledRejection);
process.on('SIGINT', handleSignal);

function handleUncaughtException(error: Error) {
  logger.error(error.message, 'Uncaught Exception');
  gracefullyExitProcess();
}

function handleUnhandledRejection(reason?: any | null) {
  const error = reason || {
    message: 'Unhandled Rejection',
  };

  logger.error(error.message, 'Unhandled Rejection');

  gracefullyExitProcess();
}

function handleSignal(signal: string) {
  logger.error(`Received Signal ${signal}`);
  gracefullyExitProcess();
}

async function gracefullyExitProcess() {
  logger.info('Exiting Process');

  if (server) {
    server.close(() => process.exit());
  }
}
