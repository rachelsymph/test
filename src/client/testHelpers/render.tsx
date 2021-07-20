import { render as renderComponent } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from '../themes/default';

const defaultHistory = createBrowserHistory();

export function render(component: React.ReactNode, history = defaultHistory) {
  return renderComponent(
    <Router history={history}>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </Router>
  );
}
