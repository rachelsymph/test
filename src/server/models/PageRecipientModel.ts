import { PageRecipient } from '../../commons/types/PageRecipient.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindPageRecipient = {
  id: string;
  keywords: string;
  legacyId: string;
};

const {
  findOne: findPageRecipient,
  batchUpsertItems: batchUpsertPageRecipients,
  createItem: createPageRecipient,
  find: findPageRecipients,
  findByIds: findPageRecipientByIds,
  softDeleteItem: deletePageRecipient,
  updateItem: updatePageRecipient,
} = configureModel<Partial<FindPageRecipient>, PageRecipient>({
  entity: Entity.PAGE_RECIPIENT,
  findKeys: ['keywords', 'legacyId'],
});

export {
  batchUpsertPageRecipients,
  createPageRecipient,
  deletePageRecipient,
  findPageRecipient,
  findPageRecipientByIds,
  findPageRecipients,
  updatePageRecipient,
};
