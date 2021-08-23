import { rem } from 'polished';
import { createGlobalStyle } from 'styled-components';

import defaultTheme from './themes/default';

type DefaultThemeProps = typeof defaultTheme;

type ThemeProps = {
  theme: DefaultThemeProps;
};

export default createGlobalStyle<ThemeProps>`
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 100%;
    font-family: ${(props) => props.theme.fontFamilies.regular};
  }

  h1 {
    font-size: ${(props) => props.theme.fontSizes.h1};
    line-height: ${rem('46px')};
  }

  h2 {
    font-size: ${(props) => props.theme.fontSizes.h2};
    line-height: ${rem('38px')};
  }

  h3 {
    font-size: ${(props) => props.theme.fontSizes.h3};
    line-height: ${rem('32px')};
  }

  h4 {
    font-size: ${(props) => props.theme.fontSizes.h4};
    line-height: ${rem('24px')};
  }

  h5 {
    font-size: ${(props) => props.theme.fontSizes.h5};
    line-height: ${rem('24px')};
  }

  subtitle1 {
    font-size: ${(props) => props.theme.fontSizes.subtitle1};
    line-height: ${rem('34px')}; 
  }

  subtitle2 {
    font-size: ${(props) => props.theme.fontSizes.subtitle2};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    line-height: ${rem('20px')}; 
    padding-bottom: ${rem('27px')}; 
  }

  body {
    font-size: ${(props) => props.theme.fontSizes.body};
    line-height: ${rem('20px')};
  }

  bodyItalic {
    font-size: ${(props) => props.theme.fontSizes.body};
    line-height: ${rem('20px')};
    font-weight: ${(props) => props.theme.fontWeights.light};
  }

  buttonMedium {
    font-size: ${(props) => props.theme.fontSizes.buttonSize};
    line-height: ${rem('22px')};
    font-weight: ${(props) => props.theme.fontWeights.medium};
  }

  buttonRegular {
    font-size: ${(props) => props.theme.fontSizes.buttonSize};
    line-height: ${rem('22px')};
    font-weight: ${(props) => props.theme.fontWeights.regular};
  }

  overline {
    font-size: ${(props) => props.theme.fontSizes.overline};
    line-height: ${rem('22px')};
    text-transform: uppercase;
    font-weight: ${(props) => props.theme.fontWeights.bold};
  }

  caption1 {
    font-size: ${(props) => props.theme.fontSizes.caption1};
    line-height: ${rem('27px')};
  }

  caption2 {
    font-size: ${(props) => props.theme.fontSizes.caption2};
    line-height: ${rem('27px')};
  }

  caption3 {
    font-size: ${(props) => props.theme.fontSizes.caption2};
    line-height: ${rem('18px')};
  }

  caption4 {
    font-family: TT Norms;
    font-size: ${(props) => props.theme.fontSizes.body};
    line-height: ${rem('21px')};
  }

  caption5 {
    font-family: TT Norms;
    font-size: ${(props) => props.theme.fontSizes.body};
    line-height: ${rem('21px')};
    font-weight: ${(props) => props.theme.fontWeights.bold};
  }
`;
