import { Goal } from '../../commons/types/Goal.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindGoal = {
  id: string;
  keywords: string;
  legacyId: string;
};

const {
  findOne: findGoal,
  batchUpsertItems: batchUpsertGoals,
  createItem: createGoal,
  find: findGoals,
  findByIds: findGoalByIds,
  softDeleteItem: deleteGoal,
  updateItem: updateGoal,
} = configureModel<Partial<FindGoal>, Goal>({
  entity: Entity.GOAL,
  findKeys: ['keywords', 'legacyId'],
});

export {
  batchUpsertGoals,
  createGoal,
  deleteGoal,
  findGoal,
  findGoalByIds,
  findGoals,
  updateGoal,
};
