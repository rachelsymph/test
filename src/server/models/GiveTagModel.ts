import { GiveTag } from '../../commons/types/GiveTag.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindGiveTag = {
  id: string;
  keywords: string;
  legacyId: string;
};

const {
  findOne: findGiveTag,
  batchUpsertItems: batchUpsertGiveTags,
  createItem: createGiveTag,
  find: findGiveTags,
  findByIds: findGiveTagByIds,
  softDeleteItem: deleteGiveTag,
  updateItem: updateGiveTag,
} = configureModel<Partial<FindGiveTag>, GiveTag>({
  entity: Entity.GIVE_TAG,
  findKeys: ['keywords', 'legacyId'],
});

export {
  batchUpsertGiveTags,
  createGiveTag,
  deleteGiveTag,
  findGiveTag,
  findGiveTagByIds,
  findGiveTags,
  updateGiveTag,
};
