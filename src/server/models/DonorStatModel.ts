import { DonorStat } from '../../commons/types/DonorStat.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindDonorStat = {
  id: string;
  keywords: string;
  legacyId: string;
};

const {
  findOne: findDonorStat,
  batchUpsertItems: batchUpsertDonorStats,
  createItem: createDonorStat,
  find: findDonorStats,
  findByIds: findDonorStatByIds,
  softDeleteItem: deleteDonorStat,
  updateItem: updateDonorStat,
} = configureModel<Partial<FindDonorStat>, DonorStat>({
  entity: Entity.DONOR_STAT,
  findKeys: ['keywords', 'legacyId'],
});

export {
  batchUpsertDonorStats,
  createDonorStat,
  deleteDonorStat,
  findDonorStat,
  findDonorStatByIds,
  findDonorStats,
  updateDonorStat,
};
