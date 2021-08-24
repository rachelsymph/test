import { DonorGender } from '../../commons/types/DonorGender.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindDonorGender = {
  id: string;
  keywords: string;
  legacyId: string;
};

const {
  findOne: findDonorGender,
  batchUpsertItems: batchUpsertDonorGenders,
  createItem: createDonorGender,
  find: findDonorGenders,
  findByIds: findDonorGenderByIds,
  softDeleteItem: deleteDonorGender,
  updateItem: updateDonorGender,
} = configureModel<Partial<FindDonorGender>, DonorGender>({
  entity: Entity.DONOR_GENDER,
  findKeys: ['keywords', 'legacyId'],
});

export {
  batchUpsertDonorGenders,
  createDonorGender,
  deleteDonorGender,
  findDonorGender,
  findDonorGenderByIds,
  findDonorGenders,
  updateDonorGender,
};
