import { Indexable } from '../../commons/types/Indexable.type';

import NotFoundError from '../errors/NotFoundError';

import datastore from '../libs/DatastoreClient';
import { getId } from '../utils/DatastoreUtils';

import * as GenericModel from './GenericModel';

type ConfigureModelParams = {
  entity: string;
  findKeys: string[];
};

type FindParamsBase = {
  id?: string;
};

type EntityBase = {
  id?: string;
};

export default function configureModel<
  FindParams extends FindParamsBase,
  Entity extends EntityBase
>(configureModelParams: ConfigureModelParams) {
  const { entity, findKeys } = configureModelParams;

  async function findByIds(ids: string[]): Promise<Entity[]> {
    const results = await GenericModel.batchFindByKeys(
      ids.map((id) => [entity, Number(id)])
    );

    return results?.[0] || [];
  }

  async function find(params: FindParams): Promise<Entity[]> {
    const query = datastore.createQuery(entity);

    query.filter('isDeleted', '=', false);

    if (params.id) {
      const itemKey = datastore.key([entity, Number(params.id)]);
      const [itemData] = await datastore.get(itemKey);

      if (itemData?.isDeleted) {
        return [];
      }

      return [
        {
          ...itemData,
          id: params.id,
        },
      ] as Entity[];
    }

    findKeys.forEach((prop) => {
      if ((params as Indexable)[prop]) {
        query.filter(prop, '=', (params as Indexable)[prop]);
      }
    });

    return GenericModel.find(query);
  }

  async function findOne(params: FindParams): Promise<Entity> {
    const [item] = await find(params);

    return item;
  }

  async function createItem(params: Entity): Promise<Entity> {
    const item = ({
      ...params,
      isDeleted: false,
      dateCreated: new Date(),
      dateUpdated: new Date(),
    } as unknown) as Entity;

    const [result] = await GenericModel.create<Entity>({
      key: entity,
      data: item,
    });

    const itemId = getId(result, entity);

    return {
      ...item,
      id: itemId,
    };
  }

  async function deleteItem(itemId: string): Promise<string> {
    await GenericModel.deleteEntity([entity, Number(itemId)]);

    return itemId;
  }

  async function updateItem(params: Entity): Promise<Entity> {
    const item = await findOne({ id: params.id } as FindParams);

    if (!item) {
      throw new NotFoundError(`${entity} not found.`);
    }

    const newEntity = {
      ...item,
      ...params,
      dateUpdated: new Date(),
    } as Entity;

    await GenericModel.update<Entity>({
      key: [entity, Number(params.id)],
      data: newEntity,
    });

    return newEntity;
  }

  async function batchUpdateItems(params: Entity[]): Promise<Entity[]> {
    const items = await Promise.all(
      params.map(async (param) => {
        const item = await findOne({ id: param.id } as FindParams);

        return {
          key: [entity, Number(param.id)],
          data: {
            ...item,
            ...param,
            dateUpdated: new Date(),
          } as Entity,
        };
      })
    );

    await GenericModel.batchUpdate<Entity>(items);

    return items.map((item) => item.data);
  }

  async function softDeleteItem(id: string): Promise<string> {
    await updateItem(({
      id,
      isDeleted: true,
    } as unknown) as Entity);

    return id;
  }

  return {
    batchUpdateItems,
    createItem,
    deleteItem,
    find,
    findByIds,
    findOne,
    softDeleteItem,
    updateItem,
  };
}
