import { UserRole } from '../constants/roles';

export type AccessPerModule = {
  [key: string]: { // key is keys in MODULE e.g. audit, feedback, loyalty, etc.
    role: UserRole;
  };
};
