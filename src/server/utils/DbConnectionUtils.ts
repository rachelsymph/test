require('dotenv').config();

import { createConnection } from 'typeorm';

export function createLegacyDbConnection() {
  return createConnection();
}
