import { DonorLinkedAccount } from '../../commons/types/DonorLinkedAccount.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindDonorLinkedAccount = {
  id: string;
  keywords: string;
  legacyId: string;
};

const {
  findOne: findDonorLinkedAccount,
  batchUpsertItems: batchUpsertDonorLinkedAccounts,
  createItem: createDonorLinkedAccount,
  find: findDonorLinkedAccounts,
  findByIds: findDonorLinkedAccountByIds,
  softDeleteItem: deleteDonorLinkedAccount,
  updateItem: updateDonorLinkedAccount,
} = configureModel<Partial<FindDonorLinkedAccount>, DonorLinkedAccount>({
  entity: Entity.DONOR_LINKED_ACCOUNT,
  findKeys: ['keywords', 'legacyId'],
});

export {
  batchUpsertDonorLinkedAccounts,
  createDonorLinkedAccount,
  deleteDonorLinkedAccount,
  findDonorLinkedAccount,
  findDonorLinkedAccountByIds,
  findDonorLinkedAccounts,
  updateDonorLinkedAccount,
};
