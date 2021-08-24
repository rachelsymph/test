import { Moment } from '../../commons/types/Moment.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindMoment = {
  id: string;
  keywords: string;
  legacyId: string;
};

const {
  findOne: findMoment,
  batchUpsertItems: batchUpsertMoments,
  createItem: createMoment,
  find: findMoments,
  findByIds: findMomentByIds,
  softDeleteItem: deleteMoment,
  updateItem: updateMoment,
} = configureModel<Partial<FindMoment>, Moment>({
  entity: Entity.MOMENT,
  findKeys: ['keywords', 'legacyId'],
});

export {
  batchUpsertMoments,
  createMoment,
  deleteMoment,
  findMoment,
  findMomentByIds,
  findMoments,
  updateMoment,
};
