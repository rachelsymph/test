/* eslint-disable no-magic-numbers */
export function stringToColorHex(str: string) {
  let hash = 0;
  let color = '#';

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;

    color += ('00' + value.toString(16)).substr(-2);
  }

  return color;
}
