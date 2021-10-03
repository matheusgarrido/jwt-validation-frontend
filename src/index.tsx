import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import Router from './Router';
import { StyledEngineProvider } from '@mui/material';

ReactDOM.render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <Router />
    </StyledEngineProvider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
