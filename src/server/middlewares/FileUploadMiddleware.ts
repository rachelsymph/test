import multer from 'multer';

import config from '../config/config';

export function uploadFile() {
  return multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: config.FILE_SIZE_LIMIT, // no larger than 5mb, you can change as needed.
    },
  }).single('file');
}
