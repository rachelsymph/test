import { FriendlyIdSlug } from '../../commons/types/FriendlyIdSlug.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindFriendlyIdSlug = {
  id: string;
  keywords: string;
  legacyId: string;
};

const {
  findOne: findFriendlyIdSlug,
  batchUpsertItems: batchUpsertFriendlyIdSlugs,
  createItem: createFriendlyIdSlug,
  find: findFriendlyIdSlugs,
  findByIds: findFriendlyIdSlugByIds,
  softDeleteItem: deleteFriendlyIdSlug,
  updateItem: updateFriendlyIdSlug,
} = configureModel<Partial<FindFriendlyIdSlug>, FriendlyIdSlug>({
  entity: Entity.FRIENDLY_ID_SLUG,
  findKeys: ['keywords', 'legacyId'],
});

export {
  batchUpsertFriendlyIdSlugs,
  createFriendlyIdSlug,
  deleteFriendlyIdSlug,
  findFriendlyIdSlug,
  findFriendlyIdSlugByIds,
  findFriendlyIdSlugs,
  updateFriendlyIdSlug,
};
