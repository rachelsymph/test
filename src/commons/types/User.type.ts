import { UserRole } from '../constants/roles';
import { UserStatus } from '../constants/status';

import { DefaultProperties } from './Common.type';

export type User = {
  dateCreated: Date;
  dateUpdated: Date;
  email: string;
  firstName: string;
  isDeleted: boolean;
  lastName: string;
  name: string;
  password: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  username: string;
} & DefaultProperties;
