import { Query } from '@google-cloud/datastore';

import datastore from '../libs/DatastoreClient';

type Params<T> = {
  key: string | any;
  data: T;
};

function batchUpdate<T>(params: Params<T>[]) {
  const newParams = params.map((param) => ({
    data: param.data,
    key: datastore.key(param.key),
  }));

  return datastore.upsert(newParams);
}

function batchFindByKeys(keys: Array<string | any>) {
  const newParams = keys.map((key: any) => datastore.key(key));

  return datastore.get(newParams);
}

async function find<T>(query: Query): Promise<T[]> {
  const [entities] = await datastore.runQuery(query);

  return Promise.all(
    entities.map(async (entity) => {
      const id = entity[datastore.KEY].id;

      return {
        ...entity,
        id,
      };
    })
  );
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

export { batchFindByKeys, batchUpdate, create, deleteEntity, find, update };
