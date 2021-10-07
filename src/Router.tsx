import React from 'react';
import NotFound from './Components/NotFound/NotFound';
import Login from './Components/Access/Login';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useAuthContext } from './Providers/Auth.provider';

export default function Router() {
  const { isAuth }: { isAuth: boolean } = useAuthContext();
  return (
    <BrowserRouter>
      <Switch>
        {/* If user not auth */}
        {!isAuth && <Route path="/login" exact component={Login} />}
        {!isAuth && <Redirect from="/home" to="/login" />}
        {/* If user is auth */}
        <Redirect exact from="/login" to="/home" />
        <Redirect exact from="/home" to="/" />
        {/* Adjustment redirects */}
        <Redirect from="/login" to="/login" />
        {/* Not found */}
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
