import { UserRole } from '../constants/roles';
import { UserStatus } from '../constants/status';

import { AccessPerModule } from './Access.type';
import { DefaultProperties } from './Common.type';

export type User = {
  accessPerModule: AccessPerModule;
  businessId: string; // Business.id
  dateCreated: Date;
  dateUpdated: Date;
  email: string;
  firstName: string;
  isDeleted: boolean;
  isFinishedAuditTutorial: boolean;
  isFinishedDashboardTutorial: boolean;
  lastName: string;
  name: string;
  password: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  username: string;
} & DefaultProperties;
