import { DefaultProperties } from './Common.type';

export type DonorStat = {
  amountTotalDollars?: number | null;
  amountTotalHours?: number | null;
  donorLegacyId?: string | null;
  month?: string | null;
  year?: string | null;
  gives: string[];
} & DefaultProperties;
