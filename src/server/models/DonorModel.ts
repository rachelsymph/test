import { Donor } from '../../commons/types/Donor.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindDonor = {
  id: string;
  keywords: string;
  legacyId: string;
  email: string;
};

const {
  findOne: findDonor,
  batchUpsertItems: batchUpsertDonors,
  createItem: createDonor,
  find: findDonors,
  findByIds: findDonorByIds,
  softDeleteItem: deleteDonor,
  updateItem: updateDonor,
} = configureModel<Partial<FindDonor>, Donor>({
  entity: Entity.DONOR,
  findKeys: ['keywords', 'legacyId', 'email'],
});

export {
  batchUpsertDonors,
  createDonor,
  deleteDonor,
  findDonor,
  findDonorByIds,
  findDonors,
  updateDonor,
};
