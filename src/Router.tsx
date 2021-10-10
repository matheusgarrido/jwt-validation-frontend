import React from 'react';
import NotFound from './Components/NotFound/NotFound';
import Login from './Components/Access/Login';
import Register from './Components/Access/Register';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useAuthContext } from './Providers/Auth.provider';

export default function Router() {
  const { isAuth }: { isAuth: boolean } = useAuthContext();
  return (
    <BrowserRouter>
      <Switch>
        {/* If user not auth */}
        {!isAuth && <Route path="/login" exact component={Login} />}
        {!isAuth && <Route path="/register" exact component={Register} />}
        {!isAuth && <Redirect from="/home" to="/login" />}
        {/* If user is auth */}
        <Redirect exact from="/login" to="/home" />
        <Redirect exact from="/register" to="/home" />
        <Redirect exact from="/home" to="/" />
        {/* Adjustment redirects */}
        <Redirect from="/login" to="/login" />
        <Redirect from="/register" to="/register" />
        {/* Not found */}
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
