import { GroupGive } from '../../commons/types/GroupGive.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindGroupGive = {
  id: string;
  keywords: string;
  legacyId: string;
};

const {
  findOne: findGroupGive,
  batchUpsertItems: batchUpsertGroupGives,
  createItem: createGroupGive,
  find: findGroupGives,
  findByIds: findGroupGiveByIds,
  softDeleteItem: deleteGroupGive,
  updateItem: updateGroupGive,
} = configureModel<Partial<FindGroupGive>, GroupGive>({
  entity: Entity.GROUP_GIVE,
  findKeys: ['keywords', 'legacyId'],
});

export {
  batchUpsertGroupGives,
  createGroupGive,
  deleteGroupGive,
  findGroupGive,
  findGroupGiveByIds,
  findGroupGives,
  updateGroupGive,
};
