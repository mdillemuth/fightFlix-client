import { createSlice } from '@reduxjs/toolkit';
import { fetchMovies } from './movies';
import axios from 'axios';

const slice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
  },
  reducers: {
    userRetrieved: (state, action) => {
      state.user = action.payload;
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
  },
});

export const {
  userRetrieved,
  userLoggedIn,
  userLoggedOut,
  accountDeleted,
  accountUpdated,
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
export const fetchUser = (token, username) => async (dispatch) => {
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
  token,
  username,
  newUsername,
  newPassword,
  newEmail,
  newBirthday
) => async (dispatch) => {
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
export const deleteAccount = (token, username) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if (window.confirm('Are you sure you wish to remove your account?')) {
    const response = await axios.delete(
      `https://my-fight-flix.herokuapp.com/api/users/${username}`,
      config
    );
  }

  dispatch(accountDeleted());
  removeLocalStorage();
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
