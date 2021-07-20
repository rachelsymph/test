import styled, { createGlobalStyle } from 'styled-components';

import defaultTheme from 'src/client/themes/default';

type DefaultThemeProps = typeof defaultTheme;

type ThemeProps = {
  theme: DefaultThemeProps;
};

export const LayoutStyle = createGlobalStyle<ThemeProps>`
  .trigger {
    padding: 0 24px;
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: ${(props) => props.theme.colors.primary1};
  }

  .site-layout .site-layout-background {
    background: ${(props) => props.theme.colors.white};
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  padding: 10px 15px;
  align-items: center;
`;

export const Logo = styled.img`
  width: 75%;
`;
