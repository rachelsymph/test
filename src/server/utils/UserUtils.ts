import { User } from '../../commons/types/User.type';

import { cleanResponse } from './ResponseUtils';

export function formatUser(user: User): User {
  return cleanResponse<User>({
    ...user,
    id: user.id,
    email: user.email,
    name: `${user.firstName} ${user.lastName}`,
    password: undefined,
  });
}

export function cleanUserData(user: Partial<User>): User {
  if (!user) {
    return {} as User;
  }

  const userData = {
    ...user,
  };

  return {
    ...userData,
    email: userData.email?.trim(),
    firstName: userData.firstName?.trim(),
    lastName: userData.lastName?.trim(),
    name: userData.name?.trim(),
    username: userData.username?.trim(),
  } as User;
}
