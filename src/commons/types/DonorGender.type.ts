import { DefaultProperties } from './Common.type';

export type DonorGender = {
  donorLegacyId?: string | null;
  genderLegacyId?: string | null;
} & DefaultProperties;
