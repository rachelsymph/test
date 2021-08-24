import { DefaultProperties } from './Common.type';

export type GroupRecipient = {
  recipientLegacyId?: string | null;
  groupLegacyId?: string | null;
} & DefaultProperties;
