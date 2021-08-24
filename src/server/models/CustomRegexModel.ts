import { CustomRegex } from '../../commons/types/CustomRegex.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindCustomRegex = {
  id: string;
  destinationKey: string;
  keywords: string;
  legacyId: string;
};

const {
  batchUpsertItems: batchUpsertCustomRegexes,
  createItem: createCustomRegex,
  find: findCustomRegexes,
  findByIds: findCustomRegexByIds,
  findOne: findCustomRegex,
  softDeleteItem: deleteCustomRegex,
  updateItem: updateCustomRegex,
} = configureModel<Partial<FindCustomRegex>, CustomRegex>({
  entity: Entity.CUSTOM_REGEX,
  findKeys: ['keywords', 'legacyId', 'destinationKey'],
});

export {
  batchUpsertCustomRegexes,
  createCustomRegex,
  deleteCustomRegex,
  findCustomRegex,
  findCustomRegexByIds,
  findCustomRegexes,
  updateCustomRegex,
};
