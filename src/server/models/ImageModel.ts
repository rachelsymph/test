import { Image } from '../../commons/types/Image.type';
import { Entity } from '../constants/entities';

import configureModel from './Base';

type FindImage = {
  id: string;
  keywords: string;
  legacyId: string;
};

const {
  findOne: findImage,
  batchUpsertItems: batchUpsertImages,
  createItem: createImage,
  find: findImages,
  findByIds: findImageByIds,
  softDeleteItem: deleteImage,
  updateItem: updateImage,
} = configureModel<Partial<FindImage>, Image>({
  entity: Entity.IMAGE,
  findKeys: ['keywords', 'legacyId'],
});

export {
  batchUpsertImages,
  createImage,
  deleteImage,
  findImage,
  findImageByIds,
  findImages,
  updateImage,
};
