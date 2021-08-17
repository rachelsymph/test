import { DefaultProperties } from './Common.type';

export type DonorEthnicity = {
  donorLegacyId?: string | null;
  specifics?: string | null;
} & DefaultProperties;
