/* global process, __dirname */
/* eslint-disable no-magic-numbers */

import { resolve } from 'path';

import dotenv from 'dotenv';

dotenv.config({
  path: resolve(__dirname, '../.env'),
});

const defaultPort = 3001;
const defaultHost = 'localhost';

const config = {
  ACCESS_CONTROL_ORIGIN_URLS:
    process.env.ACCESS_CONTROL_ORIGIN_URLS?.split(',') || [],
  BUCKET: process.env.GCLOUD_STORAGE_BUCKET || 'default',
  FILE_SIZE_LIMIT: 10 * 1024 * 1024, // 10 MB
  HOST: process.env.HOST || defaultHost,
  IS_PROD: process.env.NODE_ENV === 'production',
  LOG_LEVEL: 'debug',
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || defaultPort,
  PROJECT_ID: process.env.GOOGLE_CLOUD_PROJECT || '',
  SECRET_CODE: process.env.SECRET_CODE || 'default',
  SECRET_TOKEN: process.env.SECRET_TOKEN,
  SERVICE: process.env.GAE_SERVICE,
  SESSION_MAX_AGE: 1000 * 60 * 60 * 24, // 1 day
  SWAGGER: process.env.SWAGGER,
  VERSION: process.env.GAE_VERSION || '',
};

export default config;
