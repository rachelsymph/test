import { Ability } from '@casl/ability';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from 'src/client/App.styles';
import { AbilityContext } from 'src/client/contexts/AbilityContext';
import defaultTheme from 'src/client/themes/default';
import { GLOBAL_QUERY_CONFIG } from 'src/commons/constants/queryOptions';
import { User } from 'src/commons/types/User.type';

type Props = {
  children: React.ReactNode | React.ReactNodeArray;
  user?: User;
};

const queryClient = new QueryClient({
  defaultOptions: GLOBAL_QUERY_CONFIG,
});

export default function ContextProvider(props: Props) {
  const { children, user } = props;
  const { abilities: userAbilities } = (user as any) || { abilities: [] };

  const abilities = new Ability(userAbilities);

  return (
    <AbilityContext.Provider value={abilities}>
      <ThemeProvider theme={defaultTheme}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </AbilityContext.Provider>
  );
}
