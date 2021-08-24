import { CustomRegex } from 'src/commons/types/CustomRegex.type';

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
  const result = regexes.reduce((newResult, regex) => {
    const [, matchedValue] = haystack.match(new RegExp(regex.pattern, 'i')) || [];

    newResult[regex.destinationKey] = matchedValue;

    return newResult;
  }, {} as any);

  return {
    amount: 0,
    donorName: '',
    platformName: '',
    recipientName: '',
    ...result,
  };
}
