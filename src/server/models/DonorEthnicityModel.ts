import { DonorEthnicity } from '../../commons/types/DonorEthnicity.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindDonorEthnicity = {
  id: string;
  email: string;
  keywords: string;
};

const {
  findOne: findDonorEthnicity,
  batchUpsertItems: batchUpsertDonorEthnicities,
  createItem: createDonorEthnicity,
  find: findDonorEthnicities,
  findByIds: findDonorEthnicityByIds,
  softDeleteItem: deleteDonorEthnicity,
  updateItem: updateDonorEthnicity,
} = configureModel<Partial<FindDonorEthnicity>, DonorEthnicity>({
  entity: Entity.DONOR_ETHNICITY,
  findKeys: ['keywords', 'legacyId'],
});

export {
  batchUpsertDonorEthnicities,
  createDonorEthnicity,
  deleteDonorEthnicity,
  findDonorEthnicity,
  findDonorEthnicityByIds,
  findDonorEthnicities,
  updateDonorEthnicity,
};
