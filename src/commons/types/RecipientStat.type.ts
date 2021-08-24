import { DefaultProperties } from './Common.type';

export type RecipientStat = {
  donorCount?: number | null;
  givesAvgMonths?: number | null;
  givesCount?: number | null;
  givesGraphData?: string[] | object[] | null;
  givesTopPlatforms?: string[] | object[] | null;
  givesTopRecipientsByAmount?: string[] | object[] | null;
  givesTopRecipientsByCount?: string[] | object[] | null;
  givesTotalAmount?: number | null;
  givesTotalAmountAvg?: number | null;
  givesTotalAmountMed?: number | null;
  goalsAmount?: number | null;
  goalsAmountAvg?: number | null;
  goalsAmountMed?: number | null;
  goalsCount?: number | null;
  recipientLegacyId?: string | null;
  recurringGivesCountMed?: number | null;
  year?: string | null;
} & DefaultProperties;
