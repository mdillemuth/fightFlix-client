import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const slice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    moviesFilter: '',
    genreFilter: '',
    directorFilter: '',
  },
  reducers: {
    moviesRetrieved: (movies, action) => {
      movies.list = action.payload;
    },
    moviesFiltered: (movies, action) => {
      movies.moviesFilter = action.payload;
    },
    moviesGenreFiltered: (movies, action) => {
      movies.genreFilter = action.payload;
    },
    moviesDirectorFiltered: (movies, action) => {
      movies.directorFilter = action.payload;
    },
  },
});

export const {
  moviesRetrieved,
  moviesFiltered,
  moviesGenreFiltered,
  moviesDirectorFiltered,
} = slice.actions;
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

export const setGenreFilter = (genre) => (dispatch) => {
  dispatch(moviesGenreFiltered(genre));
};

export const setDirectorFilter = (director) => (dispatch) => {
  dispatch(moviesDirectorFiltered(director));
};
