import { RecipientStat } from '../../commons/types/RecipientStat.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindRecipientStat = {
  id: string;
  keywords: string;
  legacyId: string;
};

const {
  findOne: findRecipientStat,
  batchUpsertItems: batchUpsertRecipientStats,
  createItem: createRecipientStat,
  find: findRecipientStats,
  findByIds: findRecipientStatByIds,
  softDeleteItem: deleteRecipientStat,
  updateItem: updateRecipientStat,
} = configureModel<Partial<FindRecipientStat>, RecipientStat>({
  entity: Entity.RECIPIENT_STAT,
  findKeys: ['keywords', 'legacyId'],
});

export {
  batchUpsertRecipientStats,
  createRecipientStat,
  deleteRecipientStat,
  findRecipientStat,
  findRecipientStatByIds,
  findRecipientStats,
  updateRecipientStat,
};
