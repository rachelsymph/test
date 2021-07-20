import { Storage } from '@google-cloud/storage';
import { NextFunction, Request, Response, Router } from 'express';
import HttpStatus from 'http-status-codes';

import { FileObject } from '../../commons/types/FileObject.type';
import config from '../config/config';
import { uploadFile } from '../middlewares/FileUploadMiddleware';
import { createFileObject } from '../models/FileObjectModel';
import { formatFileObject, generateStoragePath } from '../utils/FileUtils';

const UploadRoute = Router();

const storage = new Storage();

const bucket = storage.bucket(config.BUCKET);

async function upload(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.file) {
      res.status(HttpStatus.BAD_REQUEST).send('No file uploaded.');
      return;
    }

    const filePath = generateStoragePath({
      userId: req.user?.id || '',
      originalFileName: req.file.originalname,
    });

    const blob = bucket.file(filePath);

    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on('error', (err: Error) => {
      next(err);
    });

    blobStream.on('finish', async () => {
      const newFileObject = await createFileObject({
        fileSize: req.file.size,
        fileType: req.file.mimetype,
        name: filePath,
        originalName: req.file.originalname,
        uploadedById: req.user?.id as string,
      } as FileObject);

      const fileObjectResponse = await formatFileObject(newFileObject);

      res.json(fileObjectResponse);
    });

    blobStream.end(req.file.buffer);
  } catch (e) {
    req.log.error(e);

    next(e);
  }
}

UploadRoute.route('/').post(uploadFile(), upload);

export default UploadRoute;
