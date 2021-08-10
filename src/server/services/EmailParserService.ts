import { CustomRegex } from 'src/commons/types/CustomRegex.type';

import { DestinationKey } from '../constants/destinationKeys';
import { Frequency, FREQUENCIES } from '../constants/frequencies';

type Params = {
  haystack: string;
  regexes: CustomRegex[];
};

type ParsedInfo = {
  amount: number;
  donorName: string;
  platformName: string;
  recipientName: string;
} & {
  [key: string]: string | number;
};

export function parseEmail(params: Params): ParsedInfo {
  const { haystack, regexes } = params;
  let isRecurring = false;
  let frequency;

  const result = regexes.reduce((newResult, regex) => {
    const pattern = new RegExp(regex.pattern, 'i');
    const [fullMatched, matchedValue] = haystack.match(pattern) || [];

    if (!newResult[regex.destinationKey]) {
      newResult[regex.destinationKey] = matchedValue;
    }

    if (fullMatched && !matchedValue) {
      newResult[regex.destinationKey] = fullMatched;
    }

    if (newResult[DestinationKey.RECURRING]) {
      isRecurring = true;
      frequency = Frequency.MONTHLY;
    }

    return newResult;
  }, {} as any);

  if (!isRecurring) {
    FREQUENCIES.forEach((frequencyValue: string) => {
      const pattern = new RegExp(frequencyValue, 'i');
      const [matchedValue] = haystack.match(pattern) || '';
      if (matchedValue) {
        isRecurring = true;
        frequency = frequencyValue;
      }
    });
  }

  return {
    amount: 0,
    donorName: '',
    isRecurring,
    frequency,
    platformName: '',
    recipientName: '',
    ...result,
  };
}
