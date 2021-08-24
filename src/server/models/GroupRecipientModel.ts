import { GroupRecipient } from '../../commons/types/GroupRecipient.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindGroupRecipient = {
  id: string;
  keywords: string;
  legacyId: string;
};

const {
  findOne: findGroupRecipient,
  batchUpsertItems: batchUpsertGroupRecipients,
  createItem: createGroupRecipient,
  find: findGroupRecipients,
  findByIds: findGroupRecipientByIds,
  softDeleteItem: deleteGroupRecipient,
  updateItem: updateGroupRecipient,
} = configureModel<Partial<FindGroupRecipient>, GroupRecipient>({
  entity: Entity.GROUP_RECIPIENT,
  findKeys: ['keywords', 'legacyId'],
});

export {
  batchUpsertGroupRecipients,
  createGroupRecipient,
  deleteGroupRecipient,
  findGroupRecipient,
  findGroupRecipientByIds,
  findGroupRecipients,
  updateGroupRecipient,
};
