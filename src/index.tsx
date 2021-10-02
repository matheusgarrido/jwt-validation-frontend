import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import NotFound from './Components/NotFound/NotFound';
import Login from './Components/Access/Login';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* Access */}
      <Route path="/login" exact component={Login} />
      <Redirect from="/login/*" to="/login" />
      {/* Not Found */}
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
