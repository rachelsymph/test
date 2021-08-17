import { DefaultProperties } from './Common.type';

export type PageRecipient = {
  comment?: string | null;
  imageLegacyId?: string | null;
  isHighlighted?: boolean | null;
  order?: number | null;
  pageId?: string | null;
  recipientId?: string | null;
} & DefaultProperties;
