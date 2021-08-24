import { DefaultProperties } from './Common.type';

export type Organization = {
  donorLegacyId?: string | null;
  endDate?: Date | null;
  name?: string | null;
  role?: string | null;
  startDate?: Date | null;
  title?: string | null;
  website?: string | null;
} & DefaultProperties;
