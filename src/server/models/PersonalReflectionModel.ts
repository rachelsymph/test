import { PersonalReflection } from '../../commons/types/PersonalReflection.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindPersonalReflection = {
  id: string;
  keywords: string;
  legacyId: string;
};

const {
  findOne: findPersonalReflection,
  batchUpsertItems: batchUpsertPersonalReflections,
  createItem: createPersonalReflection,
  find: findPersonalReflections,
  findByIds: findPersonalReflectionByIds,
  softDeleteItem: deletePersonalReflection,
  updateItem: updatePersonalReflection,
} = configureModel<Partial<FindPersonalReflection>, PersonalReflection>({
  entity: Entity.PERSONAL_REFLECTION,
  findKeys: ['keywords', 'legacyId'],
  excludeFromIndexes: ['message']
});

export {
  batchUpsertPersonalReflections,
  createPersonalReflection,
  deletePersonalReflection,
  findPersonalReflection,
  findPersonalReflectionByIds,
  findPersonalReflections,
  updatePersonalReflection,
};
