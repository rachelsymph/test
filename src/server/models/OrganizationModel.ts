import { Organization } from '../../commons/types/Organization.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindOrganization = {
  id: string;
  keywords: string;
  legacyId: string;
};

const {
  findOne: findOrganization,
  batchUpsertItems: batchUpsertOrganizations,
  createItem: createOrganization,
  find: findOrganizations,
  findByIds: findOrganizationByIds,
  softDeleteItem: deleteOrganization,
  updateItem: updateOrganization,
} = configureModel<Partial<FindOrganization>, Organization>({
  entity: Entity.ORGANIZATION,
  findKeys: ['keywords', 'legacyId'],
});

export {
  batchUpsertOrganizations,
  createOrganization,
  deleteOrganization,
  findOrganization,
  findOrganizationByIds,
  findOrganizations,
  updateOrganization,
};
