import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const slice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    moviesFilter: '',
  },
  reducers: {
    moviesRetrieved: (movies, action) => {
      movies.list = action.payload;
    },
    moviesFiltered: (movies, action) => {
      movies.moviesFilter = action.payload;
    },
  },
});

export const { moviesRetrieved, moviesFiltered } = slice.actions;
export default slice.reducer;

// API call to retrieve all movies
export const fetchMovies = () => async (dispatch) => {
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    'https://my-fight-flix.herokuapp.com/api/movies',
    config
  );

  dispatch(moviesRetrieved(response.data));
};

export const setMoviesFilter = (input) => (dispatch) => {
  dispatch(moviesFiltered(input));
};
