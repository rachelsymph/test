import { DefaultProperties } from './Common.type';

export type FriendlyIdSlug = {
  slug?: string | null;
  sluggableLegacyId?: string | null;
  sluggableType?: string | null;
  scope?: string | null;
} & DefaultProperties;
