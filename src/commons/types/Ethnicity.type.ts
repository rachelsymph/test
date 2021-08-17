import { DefaultProperties } from './Common.type';

export type Ethnicity = {
  donorLegacyId?: string | null;
  name?: string | null;
  sortOrder?: number | null;
} & DefaultProperties;
