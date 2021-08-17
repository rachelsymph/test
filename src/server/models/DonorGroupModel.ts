import { DonorGroup } from '../../commons/types/DonorGroup.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindDonorGroup = {
  id: string;
  keywords: string;
  legacyId: string;
};

const {
  findOne: findDonorGroup,
  batchUpsertItems: batchUpsertDonorGroups,
  createItem: createDonorGroup,
  find: findDonorGroups,
  findByIds: findDonorGroupByIds,
  softDeleteItem: deleteDonorGroup,
  updateItem: updateDonorGroup,
} = configureModel<Partial<FindDonorGroup>, DonorGroup>({
  entity: Entity.DONOR_GROUP,
  findKeys: ['keywords', 'legacyId'],
  excludeFromIndexes: ['note'],
});

export {
  batchUpsertDonorGroups,
  createDonorGroup,
  deleteDonorGroup,
  findDonorGroup,
  findDonorGroupByIds,
  findDonorGroups,
  updateDonorGroup,
};
