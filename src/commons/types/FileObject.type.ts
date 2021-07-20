import { DefaultProperties } from './Common.type';
import { User } from './User.type';

export type FileObject = {
  fileSize: number;
  fileType: string;
  name: string;
  originalName: string;
  uploadedById: string;
} & DefaultProperties;

export type FileObjectFull = FileObject & {
  tempSignedUrl: string;
  uploadedBy?: User | null;
};
