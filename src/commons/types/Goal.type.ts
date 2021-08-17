import { DefaultProperties } from './Common.type';

export type Goal = {
  amount?: number | null;
  income?: number | null;
  name?: string | null;
  setterLegacyId?: string | null;
  setterType?: string | null;
  year?: string | null;
} & DefaultProperties;
