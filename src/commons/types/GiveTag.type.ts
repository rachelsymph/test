import { DefaultProperties } from './Common.type';

export type GiveTag = {
  name?: string | null;
  giveLegacyId?: string | null;
  tagLegacyId?: string | null;
} & DefaultProperties;
