import { GetSignedUrlConfig, Storage } from '@google-cloud/storage';
import dateformat from 'dateformat';
import { v4 as uuidv4 } from 'uuid';

import {
  FileObject,
  FileObjectFull,
} from '../../commons/types/FileObject.type';
import config from '../config/config';
import { FILE_DATE_FORMAT } from '../constants/masks';
import { findOne as findUser } from '../models/UserModel';

import { formatUser } from './UserUtils';

type GenerateStoragePathParams = {
  userId: string;
  date?: Date;
  originalFileName: string;
};

type GenerateReadSignedUrl = {
  bucket?: string;
  fileName: string;
};

type FormatFileObjectOptions = {
  shouldGetUser: boolean;
};

const storage = new Storage();

const MINS_30 = 30;

function generateUniqueFileName(originalFileName: string) {
  return `${uuidv4()}-${originalFileName}`.replace(/ /gi, '_');
}

export function generateStoragePath(params: GenerateStoragePathParams) {
  const { date = new Date(), originalFileName, userId } = params;
  const uniqueFilename = generateUniqueFileName(originalFileName);

  return `${dateformat(date, FILE_DATE_FORMAT)}/${userId}/${uniqueFilename}`;
}

export async function generateV4ReadSignedUrl(params: GenerateReadSignedUrl) {
  const { bucket = config.BUCKET, fileName } = params;

  if (!fileName) {
    return null;
  }

  const expiration = Date.now() + MINS_30 * 60 * 1000;
  const options: GetSignedUrlConfig = {
    version: 'v4',
    action: 'read',
    expires: expiration,
  };

  const [url] = await storage
    .bucket(bucket)
    .file(fileName)
    .getSignedUrl(options);

  return url;
}

export async function formatFileObject(
  fileObject: FileObject | null | undefined,
  options?: FormatFileObjectOptions
): Promise<FileObjectFull | null> {
  if (!fileObject) {
    return null;
  }

  const { uploadedById } = fileObject;

  const tempSignedUrl = (await generateV4ReadSignedUrl({
    fileName: fileObject.name,
  })) as string;

  const fileObjectResponse: FileObjectFull = {
    ...fileObject,
    tempSignedUrl,
    uploadedBy: undefined,
  };

  if (options?.shouldGetUser) {
    const uploader = await findUser({
      id: uploadedById,
    });

    fileObjectResponse.uploadedBy = formatUser(uploader);
  }

  return fileObjectResponse;
}
