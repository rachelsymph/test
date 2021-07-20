import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { DashboardPage, PageNotFound } from 'src/client/pages';
import routes from 'src/commons/constants/routes';

type Props = {};

export default function AuthorizedRoutes(props: Props) {
  return (
    <Router>
      <Switch>
        <Route exact path={routes.ROOT} component={DashboardPage} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}
