import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './main.scss';
import 'bootstrap';
import PokeUIApp from './PokeUIApp';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <PokeUIApp />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
