import { DefaultProperties } from './Common.type';

export type Gender = {
  name?: string | null;
  sortOrder?: number | null;
} & DefaultProperties;
