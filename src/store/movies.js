import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const slice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    moviesFilter: '',
    genreFilter: '',
    directorFilter: '',
    moviesSort: '',
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
    moviesSortedAscending: (movies) => {
      movies.moviesSort = 'asc';
    },
    moviesSortedDescending: (movies) => {
      movies.moviesSort = 'desc';
    },
  },
});

export const {
  moviesRetrieved,
  moviesFiltered,
  moviesGenreFiltered,
  moviesDirectorFiltered,
  moviesSortedAscending,
  moviesSortedDescending,
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

export const setMoviesSort = (direction) => (dispatch) => {
  return direction === 'asc'
    ? dispatch(moviesSortedAscending())
    : dispatch(moviesSortedDescending());
};
