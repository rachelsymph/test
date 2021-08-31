/* eslint-disable no-magic-numbers */
import { rem } from 'polished';

const colors = {
  // brand colors
  teal1: '#2FECFC',
  teal2: '#0ABCC7',
  royalBlue: '#193B4E',

  // primary colors
  gray1: '#262626',
  gray2: '#71747D',
  gray3: '#F0F0F0',
  gray4: '#FFFFFF',
  gray5: '#11182C',

  // secondary colors
  blueGray: '#F8FBFD',

  // background
  white: '#F5F5F5',
};

const fontFamilies = {
  regular: "'Spartan', sans-serif",
};

const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
};

const fontSizes = {
  h1: rem('72px'),
  h2: rem('64px'),
  h3: rem('48px'),
  h4: rem('36px'),
  h5: rem('30px'),
  subtitle1: rem('24px'),
  subtitle2: rem('18px'),
  body: rem('18px'),
  buttonSize: rem('14px'),
  overline: rem('14px'),
  caption1: rem('16px'),
  caption2: rem('12px'),
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

const size = {
  mobileS: '320px',
  mobileM: '376px',
  mobileL: '426px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};

const defaultTheme = {
  colors,
  device,
  extras,
  fontFamilies,
  fontSizes,
  fontWeights,
  size,
  shadows,
};

export default defaultTheme;
