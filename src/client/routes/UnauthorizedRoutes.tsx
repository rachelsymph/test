import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { LoginPage, PageNotFound, RegistrationPage, RootPage } from 'src/client/pages';
import routes from 'src/commons/constants/routes';


type Props = {};

export default function UnauthorizedRoutes(props: Props) {
  return (
    <Router>
      <Switch>
        <Route exact path={routes.LOGIN} component={LoginPage} />
        <Route exact path={routes.REGISTER} component={RegistrationPage} />
        <Route exact path={routes.ROOT} component={RootPage} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}
