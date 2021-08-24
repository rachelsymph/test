import { DefaultProperties } from './Common.type';

export type DonorGroup = {
  donorLegacyId?: string | null;
  groupLegacyId?: string | null;
  isAccepted?: boolean | null;
  isAdmin?: boolean | null;
  note: string;
  roles: string[];
  tags: string[];
  types: string[];
} & DefaultProperties;
