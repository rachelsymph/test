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

  h6 {
    font-size: ${(props) => props.theme.fontSizes.h6};
    line-height: ${rem('22px')};
  }
`;
