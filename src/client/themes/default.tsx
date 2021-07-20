/* eslint-disable no-magic-numbers */
import { rem } from 'polished';

const colors = {
  primary1: '#1890ff',

  // gray
  dark_45: '#F9F9F9',
  dark_50: '#E5E5E5',
  dark_100: '#CCCCCC',
  dark_200: '#B2B2B2',
  dark_300: '#999999',
  dark_400: '#808080',
  dark_500: '#666666',
  dark_600: '#4C4C4C',
  dark_700: '#333333',
  dark_900: '#000000',


  success: '#28B025',
  error: '#EB5757',

  // extras
  white: '#FFFFFF',
};

const fontFamilies = {
  regular: "'Rubik', sans-serif",
};

const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
};

const fontSizes = {
  h1: rem('38px'),
  h2: rem('30px'),
  h3: rem('24px'),
  h4: rem('18px'),
  h5: rem('16px'),
  h6: rem('14px'),
  body1: rem('14px'),
  body2: rem('12px'),
  buttonSize: rem('14px'),
  caption: rem('12px'),
};

const shadows = {
  elevation1: '0px 2px 4px rgba(147, 156, 174, 0.24)',
  elevation2: '0px 4px 8px rgba(147, 156, 174, 0.24)',
  elevation3: '0px 8px 16px rgba(147, 156, 174, 0.24)',
  elevation4: '0 0 0 2px rgb(24 144 255 / 20%)',
};

const extras = {
  maxWidth: '1200px',
};

const defaultTheme = {
  colors,
  extras,
  fontFamilies,
  fontSizes,
  fontWeights,
  shadows,
};

export default defaultTheme;
