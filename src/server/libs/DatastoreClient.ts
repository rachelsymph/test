import { Datastore } from '@google-cloud/datastore';

const datastore = new Datastore();

export function setNamespace(namespace: string) {
  datastore.namespace = namespace;
}

export default datastore;
