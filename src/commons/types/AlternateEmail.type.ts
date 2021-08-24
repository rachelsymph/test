import { DefaultProperties } from './Common.type';

export type AlternateEmail = {
  donorLegacyId?: string | null;
  email?: string | null;
  expirationDate?: Date | null;
  isPrimary?: boolean;
  isVerified?: boolean;
  token?: string | null;
} & DefaultProperties;
