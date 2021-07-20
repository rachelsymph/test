/* global process */

import http from 'http';

import makeApp from './app';
import config from './config/config';
import { logger } from './libs/Logger';

let server: any;

(async function () {
  const app = await makeApp();

  server = http.createServer(app);

  server.listen(config.PORT, () => {
    logger.debug('Initializing server');
    logger.debug('Migrating database');
    logger.debug(
      `Server ready to serve traffic http://${config.HOST}:${config.PORT}`
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
