import { Page } from '../../commons/types/Page.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindPage = {
  id: string;
  keywords: string;
  legacyId: string;
};

const {
  findOne: findPage,
  batchUpsertItems: batchUpsertPages,
  createItem: createPage,
  find: findPages,
  findByIds: findPageByIds,
  softDeleteItem: deletePage,
  updateItem: updatePage,
} = configureModel<Partial<FindPage>, Page>({
  entity: Entity.PAGE,
  findKeys: ['keywords', 'legacyId'],
  excludeFromIndexes: ['quotes', 'descriptiveStyle', 'simplyStyle']
});

export {
  batchUpsertPages,
  createPage,
  deletePage,
  findPage,
  findPageByIds,
  findPages,
  updatePage,
};
