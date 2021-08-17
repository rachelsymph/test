import { UserRole } from '../constants/roles';
import { UserStatus } from '../constants/status';

import { DefaultProperties } from './Common.type';

export type User = {
  currentSignInAt?: Date | null;
  currentSignInIp?: string | null;
  email: string;
  legacyEncryptedPassword?: string | null;
  firstName: string;
  lastName: string;
  lastSignInAt?: Date | null;
  lastSignInIp?: string | null;
  name: string;
  password: string;
  rememberCreatedAt?: Date | null;
  resetPasswordSentAt?: Date | null;
  resetPasswordToken?: string | null;
  role: UserRole;
  signInCount?: number | null;
  status: UserStatus;
  username: string;
} & DefaultProperties;
