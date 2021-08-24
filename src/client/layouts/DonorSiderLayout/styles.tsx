import { Menu } from 'antd';
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
    color: ${(props) => props.theme.colors.teal2};
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  padding: 10px 15px;
  align-items: center;
`;

export const Logo = styled.img`
  width: 25%;
`;

export const MenuStyle = styled(Menu)`
  .ant-menu-item.ant-menu-item-only-child.ant-menu-item-active,
  .ant-menu-item.ant-menu-item-only-child.ant-menu-item-selected,
  .ant-menu-item.ant-menu-item-only-child.ant-menu-item-hover,
  .ant-menu-item.ant-menu-item-only-child.ant-menu-item-focus {
    background-color: ${(props) => props.theme.colors.teal2};
  }
  margin-top: 75px;
  background: ${(props) => props.theme.colors.royalBlue};
  position: fixed;
  width: 50px;
  border-right: 0;
`;
