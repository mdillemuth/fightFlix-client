import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const slice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    userRetrieved: (state, action) => {
      state.user = action.payload;
    },

    userLoggedOut: (state) => {
      state.user = null;
    },

    accountDeleted: (state) => {
      state.user = null;
    },

    accountUpdated: (state) => {
      state.user = null;
    },
  },
});

export const {
  userRetrieved,
  userLoggedOut,
  accountDeleted,
  accountUpdated,
} = slice.actions;
export default slice.reducer;

// API call to retrieve user information
export const fetchUser = (token, username) => async (dispatch, getState) => {
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

  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch(accountUpdated());
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

  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch(accountDeleted());
};

// Logging out user
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch(userLoggedOut());
};
