import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const slice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
  },
  reducers: {
    moviesRetrieved: (state, action) => {
      state.movies = action.payload;
    },
  },
});

export const { moviesRetrieved } = slice.actions;
export default slice.reducer;

// API call to retrieve movies
export const fetchMovies = (token) => async (dispatch) => {
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
