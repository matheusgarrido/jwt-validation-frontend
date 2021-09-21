import React from 'react';
import Login from '../Components/Access/Login';
import { Route, Switch, Redirect } from 'react-router-dom';

const PATH = '/acesso';

const AccessRoute = () => {
  return (
    <Switch>
      <Route path={`${PATH}/login`} exact component={Login} />
      <Redirect to={`${PATH}/login`} />
    </Switch>
  );
};

export default AccessRoute;
