import { DefaultProperties } from './Common.type';

export type PlatformStat = {
  donorCount?: number | null;
  givesAvgMonths?: number | null;
  givesCount?: number | null;
  givesTotalAmount?: number | null;
  givesTotalAmountAvg?: number | null;
  givesTotalAmountMed?: number | null;
  goalsAmount?: number | null;
  goalsAmountAvg?: number | null;
  goalsAmountMed?: number | null;
  goalsCount?: number | null;
  otherGivesCount?: number | null;
  otherGivesCountAvg?: number | null;
  otherGivesCountMed?: number | null;
  otherGivesTopPlatforms?: string[] | object[] | null;
  otherGivesTopRecipientsByAmount?: string[] | object[] | null;
  otherGivesTopRecipientsByCount?: string[] | object[] | null;
  platformLegacyId?: string | null;
  year?: string | null;
} & DefaultProperties;
