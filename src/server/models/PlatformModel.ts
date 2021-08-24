import { Platform } from '../../commons/types/Platform.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindPlatform = {
  id: string;
  keywords: string;
  legacyId: string;
  name: string;
};

const {
  batchUpsertItems: batchUpsertPlatforms,
  createItem: createPlatform,
  find: findPlatforms,
  findByIds: findPlatformByIds,
  findOne: findPlatform,
  softDeleteItem: deletePlatform,
  updateItem: updatePlatform,
} = configureModel<Partial<FindPlatform>, Platform>({
  entity: Entity.PLATFORM,
  findKeys: ['keywords', 'legacyId', 'name'],
});

export {
  batchUpsertPlatforms,
  createPlatform,
  deletePlatform,
  findPlatform,
  findPlatformByIds,
  findPlatforms,
  updatePlatform,
};
