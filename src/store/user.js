import { createSlice } from '@reduxjs/toolkit';
import { fetchMovies } from './movies';
import axios from 'axios';
import { setAlert } from './alerts';

const slice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    favorites: [],
  },
  reducers: {
    userRetrieved: (state, action) => {
      state.user = action.payload;
      state.favorites = action.payload.FavoriteMovies;
    },

    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    userLoggedOut: (state) => {
      state.user = null;
      state.token = null;
    },

    accountDeleted: (state) => {
      state.user = null;
      state.token = null;
    },

    accountUpdated: (state) => {
      state.user = null;
      state.token = null;
    },

    favoriteAdded: (state, action) => {
      state.favorites = action.payload.FavoriteMovies;
    },

    favoriteRemoved: (state, action) => {
      state.favorites = action.payload.FavoriteMovies;
    },
  },
});

export const {
  userRetrieved,
  userLoggedIn,
  userLoggedOut,
  accountDeleted,
  accountUpdated,
  favoriteAdded,
  favoriteRemoved,
} = slice.actions;
export default slice.reducer;

// API call to log in user
export const loginUser = (username, password) => async (dispatch) => {
  const response = await axios.post(
    `https://my-fight-flix.herokuapp.com/api/login`,
    {
      Username: username,
      Password: password,
    }
  );

  localStorage.setItem('token', response.data.token);
  localStorage.setItem('user', response.data.user.Username);
  dispatch(fetchMovies(response.data.token));
  dispatch(userLoggedIn(response.data));
};

// API call to retrieve user information
export const fetchUser = () => async (dispatch) => {
  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `https://my-fight-flix.herokuapp.com/api/users/${username}`,
    config
  );

  dispatch(userRetrieved(response.data[0]));
};

// API call to update user's account and log them out
export const updateAccount = (
  newUsername,
  newPassword,
  newEmail,
  newBirthday
) => async (dispatch) => {
  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `https://my-fight-flix.herokuapp.com/api/users/${username}`,
    {
      Username: newUsername,
      Password: newPassword,
      Email: newEmail,
      Birthday: newBirthday,
    },
    config
  );

  dispatch(accountUpdated());
  removeLocalStorage();
  window.open('/', '_self');
};

// API call to delete user's account and log them out
export const deleteAccount = () => async (dispatch) => {
  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if (window.confirm('Are you sure you wish to remove your account?')) {
    await axios.delete(
      `https://my-fight-flix.herokuapp.com/api/users/${username}`,
      config
    );
  }

  dispatch(accountDeleted());
  removeLocalStorage();
};

// API call to register a new user
export const registerAccount = (username, password, email, birthday) => async (
  dispatch
) => {
  await axios
    .post('https://my-fight-flix.herokuapp.com/api/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    })
    .then(() => {
      dispatch(setAlert(`Registration Successful!`, 'success'));
      window.open('/', '_self');
    })
    .catch(() => {
      dispatch(setAlert('Email or Username unavailable', 'danger'));
    });
};

// Logging out user
export const logoutUser = () => (dispatch) => {
  removeLocalStorage();
  dispatch(userLoggedOut());
};

// Helper function to clean up local storage
const removeLocalStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// API call to add favorite movie
export const addFavorite = (movieId) => async (dispatch) => {
  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `https://my-fight-flix.herokuapp.com/api/users/${username}/${movieId}`,
    {},
    config
  );

  dispatch(favoriteAdded(response.data));
};

// API call to remove favorite movie
export const removeFavorite = (movieId) => async (dispatch) => {
  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `https://my-fight-flix.herokuapp.com/api/users/${username}/${movieId}`,
    config
  );

  dispatch(favoriteRemoved(response.data));
};
