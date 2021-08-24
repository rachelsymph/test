import { DefaultProperties } from './Common.type';

export type Moment = {
  donorLegacyId?: string | null;
  flag?: number | null;
  isFeatured?: boolean | null;
  momentDate?: Date | null;
  name?: string | null;
} & DefaultProperties;
