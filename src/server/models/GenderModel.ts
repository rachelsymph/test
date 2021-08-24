import { Gender } from '../../commons/types/Gender.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindGender = {
  id: string;
  keywords: string;
  legacyId: string;
};

const {
  findOne: findGender,
  batchUpsertItems: batchUpsertGenders,
  createItem: createGender,
  find: findGenders,
  findByIds: findGenderByIds,
  softDeleteItem: deleteGender,
  updateItem: updateGender,
} = configureModel<Partial<FindGender>, Gender>({
  entity: Entity.GENDER,
  findKeys: ['keywords', 'legacyId'],
});

export {
  batchUpsertGenders,
  createGender,
  deleteGender,
  findGender,
  findGenderByIds,
  findGenders,
  updateGender,
};
