import { DefaultProperties } from './Common.type';

export type Page = {
  background?: string | null;
  city?: string | null;
  descriptiveStyle?: string | null;
  isVisible?: boolean | null;
  logo?: string | null;
  name?: string | null;
  ownerLegacyId?: string | null;
  ownerType?: string | null;
  quotes?: string | null;
  simpleStyle?: string | null;
  style?: number | null;
} & DefaultProperties;
