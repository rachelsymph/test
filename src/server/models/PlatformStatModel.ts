import { PlatformStat } from '../../commons/types/PlatformStat.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindPlatformStat = {
  id: string;
  keywords: string;
  legacyId: string;
};

const {
  findOne: findPlatformStat,
  batchUpsertItems: batchUpsertPlatformStats,
  createItem: createPlatformStat,
  find: findPlatformStats,
  findByIds: findPlatformStatByIds,
  softDeleteItem: deletePlatformStat,
  updateItem: updatePlatformStat,
} = configureModel<Partial<FindPlatformStat>, PlatformStat>({
  entity: Entity.PLATFORM_STAT,
  findKeys: ['keywords', 'legacyId'],
});

export {
  batchUpsertPlatformStats,
  createPlatformStat,
  deletePlatformStat,
  findPlatformStat,
  findPlatformStatByIds,
  findPlatformStats,
  updatePlatformStat,
};
