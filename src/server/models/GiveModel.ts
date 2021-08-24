import { Give } from '../../commons/types/Give.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindGive = {
  id: string;
  keywords: string;
  legacyId: string;
  platformId: string;
  recipientId: string;
};

const {
  batchUpsertItems: batchUpsertGives,
  createItem: createGive,
  find: findGives,
  findByIds: findGiveByIds,
  findOne: findGive,
  softDeleteItem: deleteGive,
  updateItem: updateGive,
} = configureModel<Partial<FindGive>, Give>({
  entity: Entity.GIVE,
  findKeys: ['keywords', 'legacyId', 'platformId', 'recipientId'],
  excludeFromIndexes: [
    'detailEntry',
    'headers',
    'htmlBody',
    'htmlBody',
    'rawData',
    'textBody',
  ],
});

export {
  batchUpsertGives,
  createGive,
  deleteGive,
  findGive,
  findGiveByIds,
  findGives,
  updateGive,
};
