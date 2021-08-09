import { DefaultProperties } from './Common.type';
import { Give } from './Give.type';

export type Platform = {
  domainName: string;
  gives?: Give[];
  isSyncing: boolean;
  lastSyncDate?: Date | null;
  legacyId?: string;
  name?: string | null;
  platformCompanyTypes?: string[] | null;
  platformStatusTypes?: string[] | null;
  platformTypes?: string[] | null;
  slug?: string | null;
  website?: string | null;
} & DefaultProperties;
