import { DefaultProperties } from './Common.type';

export type Group = {
  city?: string | null;
  giveTypes?: number | null;
  goal?: string | null;
  groupType?: number | null;
  groupTypeOther?: string | null;
  logo?: string | null;
  name?: string | null;
  purpose?: string | null;
  state?: string | null;
  status?: number | null;
  taxTypes?: number | null;
  website?: string | null;
  zipCode?: string | null;
} & DefaultProperties;
