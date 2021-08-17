import { Tag } from '../../commons/types/Tag.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindTag = {
  id: string;
  keywords: string;
  legacyId: string;
};

const {
  findOne: findTag,
  batchUpsertItems: batchUpsertTags,
  createItem: createTag,
  find: findTags,
  findByIds: findTagByIds,
  softDeleteItem: deleteTag,
  updateItem: updateTag,
} = configureModel<Partial<FindTag>, Tag>({
  entity: Entity.TAG,
  findKeys: ['keywords', 'legacyId'],
});

export {
  batchUpsertTags,
  createTag,
  deleteTag,
  findTag,
  findTagByIds,
  findTags,
  updateTag,
};
