import { Datastore, Query } from '@google-cloud/datastore';

import { FindResponse } from 'src/commons/types/Response.type';

import datastore from '../libs/DatastoreClient';

type Params<T> = {
  data: T;
  excludeFromIndexes?: string[];
  key: string | any;
};

function batchUpsert<T>(params: Params<T>[]) {
  const newParams = params.map((param) => ({
    data: param.data,
    excludeFromIndexes: param.excludeFromIndexes,
    key: datastore.key(param.key),
  }));

  return datastore.upsert(newParams);
}

function batchFindByKeys(keys: Array<string | any>) {
  const newParams = keys.map((key: any) => datastore.key(key));

  return datastore.get(newParams);
}

async function find<T>(query: Query): Promise<FindResponse<T>> {
  const [entities, info] = await datastore.runQuery(query);
  const entitiesWithId = await Promise.all(
    entities.map(async (entity) => {
      const id = entity[datastore.KEY].id;

      return {
        ...entity,
        id,
      };
    })
  );

  let cursor = null;

  if (info.moreResults !== Datastore.NO_MORE_RESULTS) {
    cursor = info.endCursor;
  }

  return {
    cursor,
    results: entitiesWithId,
  };
}

function create<T>(params: Params<T>) {
  return datastore.save({
    key: datastore.key(params.key),
    data: params.data,
  });
}

function update<T>(params: Params<T>) {
  return datastore.update({
    key: datastore.key(params.key),
    data: params.data,
  });
}

function deleteEntity(key: string | any) {
  return datastore.delete(datastore.key(key));
}

export { batchFindByKeys, batchUpsert, create, deleteEntity, find, update };
