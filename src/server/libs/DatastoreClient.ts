import { Datastore } from '@google-cloud/datastore';

const datastore = new Datastore();

export function setNamespace(namespace: string | undefined) {
  datastore.namespace = namespace;
}

export default datastore;
