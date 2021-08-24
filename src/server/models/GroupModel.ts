import { Group } from '../../commons/types/Group.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindGroup = {
  id: string;
  keywords: string;
  legacyId: string;
};

const {
  findOne: findGroup,
  batchUpsertItems: batchUpsertGroups,
  createItem: createGroup,
  find: findGroups,
  findByIds: findGroupByIds,
  softDeleteItem: deleteGroup,
  updateItem: updateGroup,
} = configureModel<Partial<FindGroup>, Group>({
  entity: Entity.GROUP,
  findKeys: ['keywords', 'legacyId'],
  excludeFromIndexes: ['purpose']
});

export {
  batchUpsertGroups,
  createGroup,
  deleteGroup,
  findGroup,
  findGroupByIds,
  findGroups,
  updateGroup,
};
