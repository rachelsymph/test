/* global Multer */

import { Ability } from '@casl/ability';
import winston from 'winston';

import { User as CustomUser } from '../../../commons/types/User.type';

declare global {
  namespace Express {
    interface User extends CustomUser {}

    interface Request {
      ability: Ability<any>;
      file: Multer.File;
      user?: User;
      log: winston.Logger;
    }
  }
}
