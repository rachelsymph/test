import { AlternateEmail } from '../../commons/types/AlternateEmail.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindAlternateEmail = {
  id: string;
  keywords: string;
  legacyId: string;
};

const {
  findOne: findAlternateEmail,
  batchUpsertItems: batchUpsertAlternateEmails,
  createItem: createAlternateEmail,
  find: findAlternateEmails,
  findByIds: findAlternateEmailByIds,
  softDeleteItem: deleteAlternateEmail,
  updateItem: updateAlternateEmail,
} = configureModel<Partial<FindAlternateEmail>, AlternateEmail>({
  entity: Entity.ALTERNATE_EMAIL,
  findKeys: ['keywords', 'legacyId', 'email', 'token'],
});

export {
  batchUpsertAlternateEmails,
  createAlternateEmail,
  deleteAlternateEmail,
  findAlternateEmail,
  findAlternateEmailByIds,
  findAlternateEmails,
  updateAlternateEmail,
};
