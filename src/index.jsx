// React
import React from 'react';
import ReactDOM from 'react-dom';
// Components & styling
import MainView from './components/main-view/main-view';
import './app.scss';
import 'font-awesome/css/font-awesome.css';
// Redux
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

// Initialize redux store
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <MainView />
  </Provider>,
  document.getElementById('root')
);
