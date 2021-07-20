import { FileObject } from '../../commons/types/FileObject.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindObject = {
  id: string;
  uploadedById: string;
};

const {
  createItem: createFileObject,
  deleteItem: deleteFileObject,
  find: findFileObjects,
  findOne: findFileObject,
  updateItem: updateFileObject,
} = configureModel<Partial<FindObject>, FileObject>({
  entity: Entity.FILE_OBJECT,
  findKeys: ['id', 'uploadedById'],
});

export {
  createFileObject,
  deleteFileObject,
  findFileObject,
  findFileObjects,
  updateFileObject,
};
