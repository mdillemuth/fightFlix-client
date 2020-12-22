import { combineReducers } from 'redux';
import moviesReducer from './movies';
import userReducer from './user';

export default combineReducers({
  movies: moviesReducer,
  user: userReducer,
});
