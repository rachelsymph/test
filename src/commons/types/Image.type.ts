import { DefaultProperties } from './Common.type';

export type Image = {
  file?: string | null;
  fileHash?: string | null;
  isFromGuidestar?: boolean | null;
  isPrimaryLogo?: boolean | null;
  ownerLegacyId?: string | null;
  ownerType?: string | null;
} & DefaultProperties;
