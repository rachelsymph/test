import get from 'lodash.get';

export function getId(result: any, entityName: string) {
  return get(result, 'mutationResults[0].key.path[0].id', null) || null;
}
