import React from 'react';

import { User } from 'src/commons/types/User.type';

export const UserContext = React.createContext<User>(({
  id: '',
  name: '',
  username: '',
} as unknown) as User);
