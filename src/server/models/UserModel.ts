import { UserRole } from '../../commons/constants/roles';
import { User } from '../../commons/types/User.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindUser = {
  email: string;
  id: string;
  keywords: string;
  role: UserRole;
  username: string;
};

const {
  findOne,
  batchUpsertItems: batchUpsertUsers,
  createItem: createUser,
  find: findUsers,
  findByIds: findUserByIds,
  softDeleteItem: deleteUser,
  updateItem: updateUser,
} = configureModel<Partial<FindUser>, User>({
  entity: Entity.USER,
  findKeys: ['email', 'keywords', 'username', 'role'],
});

export {
  batchUpsertUsers,
  createUser,
  deleteUser,
  findOne,
  findUserByIds,
  findUsers,
  updateUser,
};
