import { PersonalPractice } from '../../commons/types/PersonalPractice.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindPersonalPractice = {
  id: string;
  keywords: string;
  legacyId: string;
};

const {
  findOne: findPersonalPractice,
  batchUpsertItems: batchUpsertPersonalPractices,
  createItem: createPersonalPractice,
  find: findPersonalPractices,
  findByIds: findPersonalPracticeByIds,
  softDeleteItem: deletePersonalPractice,
  updateItem: updatePersonalPractice,
} = configureModel<Partial<FindPersonalPractice>, PersonalPractice>({
  entity: Entity.PERSONAL_PRACTICE,
  findKeys: ['keywords', 'legacyId'],
});

export {
  batchUpsertPersonalPractices,
  createPersonalPractice,
  deletePersonalPractice,
  findPersonalPractice,
  findPersonalPracticeByIds,
  findPersonalPractices,
  updatePersonalPractice,
};
