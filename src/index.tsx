import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import AccessRoute from './Routes/Access.route';
import NotFound from './Components/NotFound/NotFound';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/acesso" component={AccessRoute} />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
