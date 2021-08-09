import { Recipient } from '../../commons/types/Recipient.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindRecipient = {
  id: string;
  keywords: string;
  legacyId: string;
  name: string;
};

const {
  batchUpsertItems: batchUpsertRecipients,
  createItem: createRecipient,
  find: findRecipients,
  findByIds: findRecipientByIds,
  findOne: findRecipient,
  softDeleteItem: deleteRecipient,
  updateItem: updateRecipient,
} = configureModel<Partial<FindRecipient>, Recipient>({
  entity: Entity.RECIPIENT,
  excludeFromIndexes: ['ogDescription'],
  findKeys: ['keywords', 'legacyId', 'name'],
});

export {
  batchUpsertRecipients,
  createRecipient,
  deleteRecipient,
  findRecipient,
  findRecipientByIds,
  findRecipients,
  updateRecipient,
};
