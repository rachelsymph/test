import { Ethnicity } from '../../commons/types/Ethnicity.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindEthnicity = {
  id: string;
  keywords: string;
  legacyId: string;
};

const {
  findOne: findEthnicity,
  batchUpsertItems: batchUpsertEthnicities,
  createItem: createEthnicity,
  find: findEthnicities,
  findByIds: findEthnicityByIds,
  softDeleteItem: deleteEthnicity,
  updateItem: updateEthnicity,
} = configureModel<Partial<FindEthnicity>, Ethnicity>({
  entity: Entity.ETHNICITY,
  findKeys: ['keywords', 'legacyId'],
});

export {
  batchUpsertEthnicities,
  createEthnicity,
  deleteEthnicity,
  findEthnicity,
  findEthnicityByIds,
  findEthnicities,
  updateEthnicity,
};
