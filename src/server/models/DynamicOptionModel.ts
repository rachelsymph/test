import { FormField } from '../../commons/constants/fields';
import { DynamicOption } from '../../commons/types/DynamicOption.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindDynamicOption = {
  id: string;
  field: FormField;
};

const {
  createItem: createDynamicOption,
  find: findDynamicOptions,
  findOne: findDynamicOption,
  softDeleteItem: deleteDynamicOption,
  updateItem: updateDynamicOption,
} = configureModel<Partial<FindDynamicOption>, DynamicOption>({
  entity: Entity.DYNAMIC_OPTION,
  findKeys: ['id', 'field'],
});

export {
  createDynamicOption,
  deleteDynamicOption,
  findDynamicOption,
  findDynamicOptions,
  updateDynamicOption,
};
