import slugifyLib from 'slugify';

export function toTrimmedString(str: string | undefined) {
  return str?.trim() || '';
}

export function slugify(str: string) {
  return slugifyLib(toTrimmedString(str).toLowerCase());
}

export function zeroPad(num: number, size: number) {
  let newNum = num.toString();

  while (newNum.length < size) newNum = '0' + num;

  return newNum;
}

export function generateKeywords(str: string): string[] {
  const strLower = str?.trim().toLowerCase() || '';
  const splitted = strLower.split(' ');
  const keywords: string[] = [strLower, ...splitted];

  for (let i = 0; i < strLower.length; i += 1) {
    for (let j = strLower.length; j > 2; j -= 1) {
      const keyword = strLower.substr(i, j);

      if (keyword.length > 2) {
        keywords.push(keyword);
      }
    }
  }

  return [...Array.from(new Set(keywords))].filter(Boolean);
}
