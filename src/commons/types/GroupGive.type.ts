import { DefaultProperties } from './Common.type';

export type GroupGive = {
  city?: string | null;
  groupLegacyId?: string | null;
  giveLegacyId?: string | null;
} & DefaultProperties;
