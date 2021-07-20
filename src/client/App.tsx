import React from 'react';

import ContextProvider from 'src/client/components/Provider';
import { UserContext } from 'src/client/contexts/UserContext';
import useAuth from 'src/client/hooks/useAuth';
import { LoadingPage } from 'src/client/pages';

import AuthorizedRoutes from './routes/AuthorizedRoutes';
import UnauthorizedRoutes from './routes/UnauthorizedRoutes';

export default function App() {
  const { error, isLoading, user } = useAuth();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error || !user) {
    return (
      <ContextProvider>
        <UnauthorizedRoutes />
      </ContextProvider>
    );
  }

  return (
    <UserContext.Provider value={user}>
      <ContextProvider user={user}>
        <AuthorizedRoutes />
      </ContextProvider>
    </UserContext.Provider>
  );
}
