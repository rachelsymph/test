import { DefaultProperties } from './Common.type';

export type CustomRegex = {
  destinationKey: string; // platformName, recipientName, donorEmail, donorName, recurring, amount
  legacyId?: string;
  pattern: string;
  platformId?: string;
  platformLegacyId?: string;
  tags: string[]; // Platform, Recipient, Donor
} & DefaultProperties;
