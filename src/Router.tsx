import React from 'react';
import NotFound from './Components/NotFound/NotFound';
import Login from './Components/Access/Login';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        {/* Access */}
        <Route path="/login" exact component={Login} />
        <Redirect from="/login/*" to="/login" />
        {/* Not Found */}
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
