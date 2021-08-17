import { DefaultProperties } from './Common.type';

export type PersonalPractice = {
  donorLegacyId?: string | null;
  establishedDate?: Date | null;
  quote?: string | null;
  status?: string | null;
} & DefaultProperties;
