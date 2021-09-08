import { Recipient } from './Recipient.type';

export type GiveSummary = {
  cover?: string;
  isTop?: boolean;
  numberOfGives?: number;
  recipient?: Recipient;
  recipientName?: string;
  totalAmountOfGives: number;
  year?: string;
};
