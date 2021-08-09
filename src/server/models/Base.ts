import { Query } from '@google-cloud/datastore';


import { Indexable } from 'src/commons/types/Indexable.type';
import { FindResponse } from 'src/commons/types/Response.type';
import config from 'src/server/config/config';
import NotFoundError from 'src/server/errors/NotFoundError';
import datastore from 'src/server/libs/DatastoreClient';
import { getId } from 'src/server/utils/DatastoreUtils';

import * as GenericModel from './GenericModel';

type ConfigureModelParams = {
  entity: string;
  excludeFromIndexes?: string[];
  findKeys: string[];
};

type FindParamsBase = {
  id?: string;
  shouldPaginate?: boolean;
};

type FindOpts = {
  shouldPaginate?: boolean;
  cursor?: string;
  modifyQuery?: (query: Query) => Query;
};

type EntityBase = {
  id?: string;
};

export default function configureModel<
  FindParams extends FindParamsBase,
  Entity extends EntityBase
>(configureModelParams: ConfigureModelParams) {
  const { entity, excludeFromIndexes, findKeys } = configureModelParams;

  async function findByIds(ids: string[]): Promise<Entity[]> {
    const results = await GenericModel.batchFindByKeys(
      ids.map((id) => [entity, Number(id)])
    );

    return results?.[0] || [];
  }

  async function find(params: FindParams, opts?: FindOpts): Promise<FindResponse<Entity>> {
    const { cursor, shouldPaginate, modifyQuery } = opts || {};

    let query = datastore.createQuery(entity);

    if (shouldPaginate) {
      query = query.limit(config.RECORDS_PER_PAGE);

      if (cursor) {
        query = query.start(cursor);
      }
    }

    if (modifyQuery) {
      query = modifyQuery(query);
    }

    query.filter('isDeleted', '=', false);

    if (params.id) {
      const itemKey = datastore.key([entity, Number(params.id)]);
      const [itemData] = await datastore.get(itemKey);

      if (itemData?.isDeleted) {
        return {
          cursor: null,
          results: [],
        };
      }

      return {
        cursor: null,
        results: [
          {
            ...itemData,
            id: params.id,
          },
        ] as Entity[],
      }
    }

    findKeys.forEach((prop) => {
      if ((params as Indexable)[prop]) {
        query.filter(prop, '=', (params as Indexable)[prop]);
      }
    });

    return GenericModel.find(query);
  }

  async function findOne(params: FindParams): Promise<Entity> {
    const { results } = await find(params);
    const [item] = results;

    return item;
  }

  async function createItem(params: Partial<Entity>): Promise<Entity> {
    const item = ({
      ...params,
      isDeleted: false,
      dateCreated: new Date(),
      dateUpdated: new Date(),
    } as unknown) as Entity;

    const [result] = await GenericModel.create<Entity>({
      excludeFromIndexes,
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

  async function updateItem(params: Partial<Entity>): Promise<Entity> {
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
      data: newEntity,
      key: [entity, Number(params.id)],
    });

    return newEntity;
  }

  async function batchUpsertItems(params: Entity[], additionalFilters: Indexable = {}): Promise<Entity[]> {
    const items = await Promise.all(
      params.map(async (param: Indexable) => {
        let key = param.id ? [entity, Number(param.id)] : entity;
        let item = await findOne({ id: param.id } as FindParams);

        const { legacyId } = param;

        if (!param.id && legacyId) {
          item = await findOne({
            legacyId,
            ...additionalFilters as FindParams,
          });

          key = item?.id ? [entity, Number(item.id)] : entity;
        }

        if (!item) {
          item = {
            isDeleted: !!param.isDeleted,
            dateCreated: param.dateCreated ? param.dateCreated : new Date(),
          } as unknown as Entity;
        }

        return {
          key,
          data: {
            ...item,
            ...param,
            dateUpdated: new Date(),
          } as Entity,
          excludeFromIndexes,
        };
      })
    );

    await GenericModel.batchUpsert<Entity>(items);

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
    batchUpsertItems,
    createItem,
    deleteItem,
    find,
    findByIds,
    findOne,
    softDeleteItem,
    updateItem,
  };
}
