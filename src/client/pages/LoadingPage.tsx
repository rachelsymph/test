import { Spin } from 'antd';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import GlobalStyle from 'src/client/App.styles';
import defaultTheme from 'src/client/themes/default';

type Props = {};

export default function LoadingPage(props: Props) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Fullscreen>
        <Spin size="large" />
      </Fullscreen>
    </ThemeProvider>
  );
}

const Fullscreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  img {
    transform: scale(0.5);
  }
`;
