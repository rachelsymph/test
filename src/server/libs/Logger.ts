import * as lw from '@google-cloud/logging-winston';
import expressWinston from 'express-winston';
import winston from 'winston';

import config from '../config/config';

const { format } = winston;

const levels = {
  emergency: 0,
  alert: 1,
  critical: 2,
  error: 3,
  warn: 4,
  warning: 4,
  notice: 5,
  info: 6,
  debug: 7,
};

const colors = {
  debug: 'white',
  error: 'red',
  http: 'magenta',
  info: 'green',
  warn: 'yellow',
};

const loggingWinston = new lw.LoggingWinston({
  levels,
});

winston.addColors(colors);

function stringifyJson(obj: any) {
  if (config.IS_PROD) {
    return JSON.stringify(obj);
  }

  return JSON.stringify(obj, null, 2);
}

const colorizeFormat = config.IS_PROD
  ? format((info) => {
      info.severity = info.level.toUpperCase().replace('WARN', 'WARNING');

      return info;
    })
  : format.colorize;

const formatMeta = (meta: any) => {
  const splat = meta[Symbol.for('splat')];

  if (splat && splat.length) {
    return splat.length === 1 ? stringifyJson(splat[0]) : stringifyJson(splat);
  }

  return '';
};

const print = format.printf(
  ({ label = '', level, message, meta, stack, timestamp, ...extras }) => {
    if (extras) {
      message = `${message} ${formatMeta(extras)}`;
    }

    if (meta) {
      message = `${message} ${stringifyJson(meta)}`;
    }

    const logLines = [`[${timestamp}] [${level}] ${message}`];

    if (stack) {
      logLines.push(`\n${stack}`);
    }

    return logLines.join('');
  }
);

export const commonFormat = format.combine(
  format.timestamp(),
  format.errors({ stack: true }),
  colorizeFormat(),
  print
);

const transports = config.IS_PROD
  ? [loggingWinston]
  : [
      new winston.transports.Console({
        format: commonFormat,
        level: config.LOG_LEVEL,
      }),
    ];

export class Logger {
  private logger;
  private loggerMiddleware;

  constructor() {
    this.logger = winston.createLogger({
      transports,
      levels,
      exitOnError: false,
      format: commonFormat,
      level: config.LOG_LEVEL,
      rejectionHandlers: transports,
    } as any);

    this.loggerMiddleware = expressWinston.logger({
      transports,
      meta: true,
      requestWhitelist: [
        'url',
        'method',
        'httpVersion',
        'originalUrl',
        'query',
        'body',
      ],
      responseWhitelist: ['statusCode', 'body'],
      statusLevels: true,
      msg: 'HTTP {{req.method}} {{req.url}}',
      expressFormat: true,
      colorize: true,
    });
  }

  public child(options: Object) {
    return this.logger.child(options);
  }

  public add(newTransport: winston.transport) {
    this.logger.add(newTransport);
  }

  public info(message: any, ...meta: any) {
    this.logger.info(message, ...meta);
  }

  public http(message: any, ...meta: any) {
    this.logger.http(message, ...meta);
  }

  public warn(message: any, ...meta: any) {
    this.logger.warn(message, ...meta);
  }

  public debug(message: any, ...meta: any) {
    this.logger.debug(message, ...meta);
  }

  public error(message: any, ...meta: any) {
    this.logger.error(message, ...meta);
  }

  public getLogger() {
    return this.logger;
  }

  public getLoggerMiddleware() {
    return this.loggerMiddleware;
  }
}

export const logger = new Logger();
