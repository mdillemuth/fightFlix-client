import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MainView from './components/main-view/main-view';
import './app.scss';
import 'font-awesome/css/font-awesome.css';

ReactDOM.render(
  <BrowserRouter>
    <MainView />
  </BrowserRouter>,
  document.getElementById('root')
);
