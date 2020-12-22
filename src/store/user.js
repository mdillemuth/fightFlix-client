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
  },
});

export const { userRetrieved, userLoggedOut } = slice.actions;
export default slice.reducer;

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

// Logging out user
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  dispatch(userLoggedOut());
};
