import { DefaultProperties } from './Common.type';

export type DonorLinkedAccount = {
  donorLegacyId?: string | null;
  donorAccountLegacyId?: string | null;
  isVerified?: boolean | null;
  email?: string | null;
  token?: string | null;
} & DefaultProperties;
