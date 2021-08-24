import { DefaultProperties } from './Common.type';

export type PersonalReflection = {
  donorLegacyId?: string | null;
  establishedDate?: Date | null;
  message?: string | null;
  prompts?: string[] | null;
} & DefaultProperties;
