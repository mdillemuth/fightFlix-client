import { combineReducers } from 'redux';
import moviesReducer from './movies';
import userReducer from './user';
import alertsReducer from './alerts';

export default combineReducers({
  movies: moviesReducer,
  user: userReducer,
  alerts: alertsReducer,
});
